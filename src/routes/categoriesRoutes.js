const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/api/categoriesController.js');
const checkRole = require('../middleware/checkRole.js');
const { validateCategory } = require('../validations/categoryValidation');
const { validationResult } = require('express-validator');
const verifyToken = require('../middleware/verifyToken.js');

router.get('/', CategoriesController.getAll);
router.get('/:id', CategoriesController.getOne);
router.get('/:id/products', CategoriesController.getProductsByCategory);
router.post(
  '/',
  verifyToken,
  checkRole('admin'),
  validateCategory,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  CategoriesController.create
);

router.put(
  '/:id',
  verifyToken,
  checkRole('admin'),
  validateCategory,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  CategoriesController.update
);

router.delete('/:id', verifyToken, checkRole('admin'), CategoriesController.remove);

module.exports = router;