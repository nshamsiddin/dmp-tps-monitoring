const mongoose = require('mongoose')
const db = require('../utils/mongodb')

// User Model
const UserSchema = new db.mongoose.Schema({
    username: {type: String, required: true},
    group: {type: String, required: true},
    name: {type: String, required: true},
    email: String,
    password: String,
    created: { type: Date, default: Date.now },
    active: Boolean,
    gender: { type: String, enum: ['male', 'female'] },
    birthday: Date,
    last_active: { type: Date, default: Date.now },
})

UserSchema.pre('save', (next) => {
    this.last_active = Date.now()
    next()
})

exports.User = db.connect.model('User', UserSchema)