const express = require('express')
const { getMenu, addDish, editDish, deleteDish } = require('../Controllers/menuController');
const authMiddleware = require('../middleware/authMiddleware')
const { adminOnly } = require('../middleware/roleMiddleware');


const router = express.Router()


// Open route
router.get('/', getMenu)


// Admin routes
router.post('/', authMiddleware, adminOnly, addDish)

router.put('/:id', authMiddleware, adminOnly, editDish)

router.delete('/:id', authMiddleware, adminOnly, deleteDish)


module.exports = router