const express = require('express');
const router = express.Router();
const CartController = require('../controllers/api/cartController.js');
const verifyToken = require('../middleware/verifyToken.js');
const checkRole = require('../middleware/checkRole.js');

router.get('/', verifyToken, checkRole('cliente'), CartController.getCart);
router.post('/', verifyToken, checkRole('cliente'), CartController.addToCart);
router.put('/:productId', verifyToken, checkRole('cliente'), CartController.updateCartItem);
router.delete('/:productId', verifyToken, checkRole('cliente'), CartController.deleteCartItem);
router.post('/checkout', verifyToken, checkRole('cliente'), CartController.checkout);

module.exports = router;
