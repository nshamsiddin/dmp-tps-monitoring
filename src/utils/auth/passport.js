const LocalStrategy = require('passport-local').Strategy
// const ADStratety = require('passport-activedirectory').Strategy
// const ActiveDirectory = require('activedirectory')

const User = require('../../controllers/user')
const config = require('../../../config')

module.exports = (passport) => {
    passport.use(
        new LocalStrategy((username, password, done) => {
            User.getByUsername(username)
                .then(user => {
                    if (!user)
                        return done(null, false, { type: 'danger', message: 'No such user' })
                    return done(null, user)
                })
        })
    )
    passport.serializeUser((user, done) => {
        done(null, user)
    })
    passport.deserializeUser((id, done) => {
        User.getById(id)
            .then(user => done(null, user))
    })
}
