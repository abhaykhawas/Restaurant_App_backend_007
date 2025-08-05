const express = require('express')
const {
    createOrder,
    getMyOrders,
    trackOrders,
    adminGetOrder,
    updateOrderStatus
} = require('../Controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware')
const { adminOnly } = require('../middleware/roleMiddleware');


const router = express.Router()

// Customer
router.post('/', authMiddleware, createOrder)

router.get('/', authMiddleware, getMyOrders)

router.get('/:id/track', authMiddleware, trackOrders)


// Admin
router.get('/admin/all', authMiddleware, adminOnly, adminGetOrder)

router.put('/admin/:id', authMiddleware, adminOnly, updateOrderStatus)


module.exports = router