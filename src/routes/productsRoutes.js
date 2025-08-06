const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/api/productsController.js');
const checkRole = require('../middleware/checkRole.js');
const verifyToken = require('../middleware/verifyToken.js');
const { validateProduct } = require('../validations/productValidation');
const { validationResult } = require('express-validator');

router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getOne);

router.post(
  '/',
  verifyToken,
  checkRole('admin'),
  validateProduct,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  ProductController.create
);

router.put(
  '/:id',
  verifyToken,
  checkRole('admin'),
  validateProduct,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  ProductController.update
);

router.delete('/:id', verifyToken, checkRole('admin'), ProductController.remove);

module.exports = router;
