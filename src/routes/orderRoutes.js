const express = require('express');
const router = express.Router();
const orderController = require('../controllers/api/orderController');
const verifyToken = require('../middleware/verifyToken');

router.get('/history', verifyToken, orderController.getOrderHistory);

module.exports = router;
