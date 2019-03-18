const mongoose = require('mongoose')
const db = require('../utils/mongodb')

// Role Model
const RoleSchema = new db.mongoose.Schema({
    name: String,
    granted_routes: Array
})

exports.Role = db.connect.model('Role', RoleSchema)