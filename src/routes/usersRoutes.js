const express = require('express');
const router = express.Router();
const usersController = require('../controllers/api/usersController.js');
const { validateUser } = require('../validations/userValidation');
const { validationResult } = require('express-validator');
const { validateLogin } = require('../validations/loginValidation');
const verifyToken = require('../middleware/verifyToken.js');
const checkRole = require('../middleware/checkRole.js');

// Validación en el registro
router.post(
  '/register',
  validateUser,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  usersController.register
);

// Login (sin validación por ahora)
router.post(
  '/login',
  validateLogin,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  usersController.login
);
router.get(
  '/',
  verifyToken,
  checkRole('admin'),
  usersController.getAllUsers
);
router.get(
  '/:id',
  verifyToken, // verifica que esté logueado
  usersController.getUserById // lógica de autorización está en el controller
);
router.put(
  '/:id',
  verifyToken,checkRole('admin'),
  usersController.updateUser
)
router.delete('/:id', verifyToken, usersController.deleteUser);

module.exports = router;
