require('dotenv').config()

const environment = process.env.NODE_ENV || 'development'

module.exports = {
    environment: process.env.NODE_ENV || 'development',
    logging: {
        folder: process.env.LOGS_FOLDER || 'logs',
        level: process.env.LOGGING_LEVEL || 'http'
    },
    app_name: process.env.APP_NAME || 'TEMPLATE',
    server: {
        port: process.env.SERVER_PORT || 3000,
    },
    session: {
        expires: process.env.COOKIE_EXPIRES || 1000 * 60 * 60,
        name: process.env.SESSION_NAME || 'SID',
        secret: process.env.SESSION_SECRET || '@$C?T',
        resave: false
    },
    mongodb: {
        url: process.env.MONGODB_URL || 'mongodb://localhost:27017/test'
    }
}