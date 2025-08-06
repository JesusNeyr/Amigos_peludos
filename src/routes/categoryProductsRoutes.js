const express = require('express');
const router = express.Router();
const controller = require('../controllers/api/categoryProductsController');

// GET - Obtener productos por categoría
router.get('/:id/products', controller.getProductsByCategory);

module.exports = router;
