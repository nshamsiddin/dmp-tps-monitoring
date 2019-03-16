const morgan = require('morgan')
const logger = require('./logger')
const format = ':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'
module.exports = morgan(format, { 'stream': logger.stream })