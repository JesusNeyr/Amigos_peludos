const express = require('express');
const router = express.Router();
const controller = require('../controllers/api/productCategorieController');
const checkRole = require('../middleware/checkRole'); // si vas a restringir por rol
const verifyToken = require('../middleware/verifyToken');

router.get('/:productId/categories', controller.getCategories);
router.put('/:productId/categories', verifyToken, checkRole('admin'), controller.updateCategories);


module.exports = router;
