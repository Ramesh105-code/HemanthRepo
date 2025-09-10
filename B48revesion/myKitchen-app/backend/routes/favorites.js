const express = require('express');
const auth = require('../middleware/auth');
const { addFavorite, getFavorites,emoveFavorite} = require('../controllers/favoriteController');
const router = express.Router();

router.post('/add'.auth, addFavorite);
router.post('/remove',auth,removeFavorite);
router.get('/',auth,getFavorites);

module.exports = router;