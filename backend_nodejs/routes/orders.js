const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/', getOrders); // For admin dashboard

module.exports = router;