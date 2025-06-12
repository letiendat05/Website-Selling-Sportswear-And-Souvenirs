const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const controller = require('../controllers/orderController');

router.post('/', controller.createOrder);
router.get('/', auth, controller.getOrders);

module.exports = router;