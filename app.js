const config = require('./config')

const logger = require('./src/utils/logger')
const request_logger = require('./src/utils/request_logger')

const environment = config.environment
const mongodb = require('./src/utils/mongodb')
const passport = require('passport')
const express = require('express')
const session = require('express-session')
const path = require('path')
const messages = require('express-messages')
const flash = require('connect-flash')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))

app.use(require('connect-flash')())
app.use((req, res, next) => {
    res.locals.messages = require('express-messages')(req, res)
    res.locals.app_title = config.app_name
    next()
})

//Passport config
require('./src/utils/auth/passport')(passport)

//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

//Global user variable
app.get('*', (req, res, next) => {
    res.locals.user = req.user || null
    if (res.locals.user) {
        res.locals.access = res.locals.user.access
    }
    next()
})

app.get('/', (req, res) => {
    res.redirect('/requests')
})

const index = require('./src/routes/index')
const users = require('./src/routes/users')
const roles = require('./src/routes/roles')
app.use('/', index)
app.use('/users', users)
app.use('/roles', roles)


const port = config.server.port
app.set('port', port)

app.listen(port, (err) => {
    logger.info(`Server started listening on port ${port}`)
})