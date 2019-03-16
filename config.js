require('dotenv').config()

const environment = process.env.NODE_ENV || 'development'

module.exports = {
    environment: process.env.NODE_ENV || 'development',
    logging: {
        folder: process.env.LOGS_FOLDER || 'logs',
        level: process.env.LOGGING_LEVEL || 'http'
    },
    server: {
        port: process.env.SERVER_PORT || 3000
    }
}