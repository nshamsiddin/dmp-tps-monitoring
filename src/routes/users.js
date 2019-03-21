const express = require('express')
const passport = require('passport')
const router = express.Router()

const User = require('../controllers/user')

router.get('/', async (req, res, next) => {
	const users = await User.get()
	res.send(users)
})

router.get('/add', (req, res) => {
	res.render('users/add')
})

router.post('/add', (req, res) => {
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

router.post('/login', (req, res, next) => {
	// req.checkBody('username', 'Username is required').notEmpty()
	// req.checkBody('password', 'Password is required').notEmpty()

	// let errors = req.validationErrors()

	// if (errors) {
	//     res.render('users/login', {
	//         title: 'Login',
	//         errors: errors
	//     })
	// }
	// else {
	passport.authenticate('local', {
		successRedirect: '/',
		successFlash: true,
		failureMessage: 'test',
		failureRedirect: '/users/login',
		failureFlash: true
	})(req, res, next)

	// passport.authenticate('local', {
	// 	successRedirect: '/',
	// 	successFlash: true,
	// 	failureMessage: 'test',
	// 	failureRedirect: '/users/login',
	// 	failureFlash: true
	// })(req, res, next)
	// }
})

router.get('/logout', (req, res) => {
	req.logout()
	req.flash('sucess', 'You are now logged out')
	res.redirect('/users.login')
})


module.exports = router
