const express = require('express')
const { register, login, prof } = require('../Controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

// Public routes
router.post('/register', register)

router.post('/login', login)

// Protected route example
router.get('/prof', authMiddleware, prof)


module.exports = router