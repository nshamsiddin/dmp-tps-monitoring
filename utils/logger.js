const config = require('../config')
const tools = require('./tools')
const path = require('path')
const winston = require('winston')
const { combine, timestamp, label, prettyPrint } = winston.format

const logger = new (winston.createLogger)({
    level: config.logging.level,
    format: combine(
        timestamp(),
        // prettyPrint()
        winston.format.json()
    ),
    colorize: true,
    transports: [new winston.transports.Console()]
})

logger.stream = { write: (message, encoding) => logger.http(message) }

logger.addTransport = type => {
    if (typeof winston.config.npm.levels[type] !== 'undefined') {
        const filename = `${path.resolve(config.logging.folder, type)}.log`
        logger.add(new winston.transports.File({ filename: filename, level: type, colorize: true }))
        return true
    }
    else {
        return false
    }
}

logger.addTransport('error')
logger.addTransport('info')
logger.addTransport('http')

module.exports = logger