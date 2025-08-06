const express = require('express');
const router = express.Router();
const FavoriteController = require('../controllers/api/favoriteController');
const verifyToken = require('../middleware/verifyToken.js');

router.get('/', verifyToken, FavoriteController.getFavorites);
router.post('/', verifyToken, FavoriteController.addFavorite);
router.delete('/:productId', verifyToken, FavoriteController.removeFavorite);

module.exports = router;

