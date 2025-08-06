const { body } = require('express-validator');

const validateUser = [
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio'),

  body('email')
    .isEmail().withMessage('El email debe ser válido'),

  body('password')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

  body('role')
    .optional()
    .isIn(['admin', 'user']).withMessage('El rol debe ser admin o user')
];

module.exports = { validateUser };
