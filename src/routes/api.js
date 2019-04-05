const express = require('express')
const router = express.Router()

const Request = require('../controllers/request')

router.get('/requests', async (req, res) => {
    const transactions = await Request.getAggregated(400)
    res.send(transactions)
})

module.exports = router
