const express = require('express');
const { create, getMyOrders, getAllOrders } = require('../controllers/order.controller');
const { auth, admin } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/', auth, create);
router.get('/my', auth, getMyOrders);
router.get('/', auth, admin, getAllOrders);

module.exports = router;
