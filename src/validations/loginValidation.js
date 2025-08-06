const { body } = require('express-validator');

const validateLogin = [
  body('email')
    .isEmail().withMessage('Email inválido'),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
];

module.exports = { validateLogin };
