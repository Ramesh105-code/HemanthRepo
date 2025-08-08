const express = require('express');
const router = express.Router();
const { getCart, addItem, removeItem } = require('../controllers/cartController');
const auth = require('../middlewares/auth');

router.get('/', auth, getCart);
router.post('/items', auth, addItem);
router.delete('/items/:productId', auth, removeItem);

module.exports = router;