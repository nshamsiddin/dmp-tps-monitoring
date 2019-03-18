const config = require('./config')
const environment = config.environment
const mongodb = require('./src/utils/mongodb')
const express = require('express')
const session = require('express-session')
const path = require('path')

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

//Set public folder
app.use(express.static(path.join(__dirname, 'public')))

//Session middleware
app.use(session({
    name: config.session.name,
    cookie: {
        maxAge: config.session.expires,
        sameSite: true,
        // IN PROD should be uncommented
        // secure: true
    },
    resave: config.session.resave,
    saveUninitialized: false,
    secret: config.session.secret
}))

app.get('*', (req, res, next) => {
    res.locals.app_title = config.app_name
    next()
})

//Routes
app.use('/', index)
app.use('/users', users)
app.use('/roles', roles)

// app.use((req, res, next) => {
//     next(createError(404))
// })

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

const port = config.server.port
app.set('port', port)

app.listen(port, (err) => {
    logger.info(`Server started listening on port ${port}`)
})