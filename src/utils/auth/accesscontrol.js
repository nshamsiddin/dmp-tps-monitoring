module.exports = {
    user: (req, res, next) => {
        if (req.isAuthenticated())
            return next()
        else {
            req.flash('warning', 'Please sign in')
            res.redirect('/users/login')
        }
    },
    admin: (req, res, next) => {
        if (req.isAuthenticated()) {
            if (req.user.group == 'admin') {
                return next()
            }
            else {
                req.flash('warning', 'Insufficient privileges')
                res.redirect('back')
            }
        }
        else {
            req.flash('danger', 'You are not authenticated')
            res.redirect('/users/login')
        }
    }
}