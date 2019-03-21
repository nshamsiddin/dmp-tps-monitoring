const express = require('express')
const router = express.Router()

const ensure = require('../utils/auth/accesscontrol')

router.get('/', ensure.user, (req, res, next) => {
	res.render('index')
})

module.exports = router
