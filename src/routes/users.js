const express = require('express')
const router = express.Router()

const User = require('../controllers/user')

/* GET users listing. */
router.get('/', async (req, res, next) => {
	const users = await User.get()
	res.send(users)
})

router.get('/add', (req, res) => {
	res.render('users/add')
})

router.post('/add', (req, res) => {
	const { username, role } = req.body
})

router.get('/register', (req, res) => {
	res.render('users/register')
})

router.post('/register', (req, res) => {

})

router.get('/login', (req, res) => {
	res.render('users/login')
})

router.post('/login', (req, res) => {
	const { username, password } = req.body
	console.log(username)
	console.log(password)
})

router.post('/logout', (req, res) => {

})


module.exports = router
