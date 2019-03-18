const express = require('express')
const router = express.Router()

const Role = require('../controllers/role')

/* GET roles listing. */
router.get('/', async (req, res) => {
	const roles = await Role.get()
	res.send(roles)
})

module.exports = router
