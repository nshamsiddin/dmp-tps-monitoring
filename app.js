const config = require('./config')
const environment = config.environment
const mongodb = require('./src/utils/mongodb')
const passport = require('passport')
const express = require('express')
const session = require('express-session')
const path = require('path')
const messages = require('express-messages')
const flash = require('connect-flash')

//Loggers
const logger = require('./src/utils/logger')
const request_logger = require('./src/utils/request_logger')

//Load routes
const index = require('./src/routes/index')
const users = require('./src/routes/users')
const roles = require('./src/routes/roles')

//Initialize express
const app = express()

//Set views folder
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//Set public folder
app.use(express.static(path.join(__dirname, 'public')))

//Request logger
app.use(request_logger)

//Body-parser middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Session middleware
app.use(session({
    name: config.session.name,
    // cookie: {
    // maxAge: config.session.expires,
    // sameSite: true,
    // IN PROD should be uncommented
    // secure: true
    // },
    resave: config.session.resave,
    saveUninitialized: false,
    secret: config.session.secret
}))

//Flash message middleware
app.use(flash())
app.use((req, res, next) => {
    res.locals.messages = messages(req, res)
    res.locals.app_title = config.app_name
    next()
})

//Passport config
require('./src/utils/auth/passport')(passport)

//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

//Routes
app.use('/', index)
app.use('/users', users)
app.use('/roles', roles)

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

app.get('*', (req, res, next) => {
    res.locals.user = req.user
    next()
})

const port = config.server.port
app.set('port', port)

app.listen(port, (err) => {
    logger.info(`Server started listening on port ${port}`)
})