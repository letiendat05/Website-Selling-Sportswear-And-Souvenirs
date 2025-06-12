const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const controller = require('../controllers/productController');

router.get('/', controller.getProducts);
router.post('/', auth, controller.createProduct);
router.put('/:id', auth, controller.updateProduct);
router.delete('/:id', auth, controller.deleteProduct);

module.exports = router;