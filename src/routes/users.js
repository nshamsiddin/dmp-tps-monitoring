const express = require('express')
const passport = require('passport')
const router = express.Router()

const User = require('../controllers/user')
const ensure = require('../utils/auth/accesscontrol')


router.get('/', ensure.user, async (req, res, next) => {
	const users = await User.get()
	res.send(users)
})

router.get('/add', ensure.admin, (req, res) => {
	res.render('users/add')
})

router.post('/add', ensure.admin, (req, res) => {
	const { username, password } = req.body
	let errors = []
	if (!username || !password) {
		errors.push({ msg: 'Please fill in all fields' })
	}
	if (errors.length > 0) {
		res.render('users/add', { errors })
	}
	else {
		res.send('pass')
	}
})

router.get('/login', (req, res, next) => {
	res.render('users/login')
})

router.post('/login', (req, res, next) => {

	const { username, password } = req.body
	let errors = []

	if (!username || !password) {
		errors.push({ msg: 'Please fill in all fields' })
	}
	if (errors.length > 0) {
		res.render('users/login', { errors })
	}
	else {
		passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/users/login',
			failureFlash: true
		})(req, res, next)
		// res.send('pass')
	}


})

router.get('/logout', ensure.user, (req, res) => {
	req.logout()
	req.flash('sucess', 'You are now logged out')
	res.redirect('/users.login')
})


module.exports = router
