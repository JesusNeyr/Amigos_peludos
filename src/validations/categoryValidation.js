const { body } = require('express-validator');

const validateCategory = [
  body('name')
    .notEmpty().withMessage('El nombre de la categoría es obligatorio')
];

module.exports = { validateCategory };
