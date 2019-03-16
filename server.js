const config = require('./config')
const environment = config.environment

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

//Loggers
const logger = require('./utils/logger')
const request_logger = require('./utils/request_logger')


const index = require('./routes/index');
const users = require('./routes/users');

const app = express()

//Set views folder
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//Request logger
app.use(request_logger)

//Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Set public folder
app.use(express.static(path.join(__dirname, 'public')))


//Routes
app.use('/', index);
app.use('/users', users);

app.use((req, res, next) => {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


app.listen(config.server.port, (err) => {
    logger.info(`Server started listening on port ${config.server.port}`)
})