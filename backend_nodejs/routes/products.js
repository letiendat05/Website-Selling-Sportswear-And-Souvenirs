const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controllers/productController');

router.get('/', getAllProducts);

module.exports = router;