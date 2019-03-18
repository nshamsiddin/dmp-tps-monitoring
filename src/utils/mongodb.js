const logger = require('../utils/logger')
const mongoose = require('mongoose')
const config = require('../../config')

mongoose.Promise = global.Promise

mongoose.connect(config.mongodb.url, { useNewUrlParser: true })

const db = mongoose.connection

db.once('connected', () => {
    logger.info(`Connected to MongoDB at: ${config.mongodb.url}`)
})

db.on('error', (err) => {
    logger.error(`Error with MongoDB: ${err}`)
})

// MongoDB
exports.mongoose = mongoose

// This DB
exports.connect = db