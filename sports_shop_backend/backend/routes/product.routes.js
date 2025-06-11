const express = require('express');
const { getAll, create, update, remove } = require('../controllers/product.controller');
const { auth, admin } = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/', getAll);
router.post('/', auth, admin, create);
router.put('/:id', auth, admin, update);
router.delete('/:id', auth, admin, remove);

module.exports = router;
