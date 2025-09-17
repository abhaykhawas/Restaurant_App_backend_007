const express = require('express')
const { createPaymentIntent } = require('../Controllers/paymentController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/create-payment-intent', createPaymentIntent)

module.exports = router