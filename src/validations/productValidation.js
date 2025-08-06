const { body } = require('express-validator');

const validateProduct = [
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('description').notEmpty().withMessage('La descripción es obligatoria'),
  body('price').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
  body('discount').optional().isFloat({ min: 0, max: 100 }).withMessage('El descuento debe ser entre 0 y 100'),
  body('is_best_seller').isBoolean().withMessage('Debe ser booleano'),
  body('stock').isInt({ min: 0 }).withMessage('El stock debe ser un número entero no negativo'),
  body('image_url').isURL().withMessage('La URL de la imagen no es válida')
];

module.exports = { validateProduct };
