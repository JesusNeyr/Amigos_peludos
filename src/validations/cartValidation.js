const { body, param } = require("express-validator");

const validateUserIdParam = [
  param("userId")
    .isInt({ min: 1 })
    .withMessage("El ID de usuario debe ser un número entero positivo."),
];

const validateProductIdParam = [
  param("productId")
    .isInt({ min: 1 })
    .withMessage("El ID del producto debe ser un número entero positivo."),
];

const validateAddToCart = [
  ...validateUserIdParam,
  body("product_id")
    .isInt({ min: 1 })
    .withMessage("El ID del producto es obligatorio y debe ser un número entero."),
  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser un número entero positivo si se especifica."),
];

const validateUpdateCartItem = [
  ...validateUserIdParam,
  ...validateProductIdParam,
  body("quantity")
    .notEmpty()
    .withMessage("La cantidad es obligatoria.")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser un número entero positivo."),
];
const validateCheckout = [
  body('userId')
    .notEmpty().withMessage('El ID de usuario es obligatorio')
    .isInt({ min: 1 }).withMessage('El ID de usuario debe ser un número entero positivo'),
];

const validateRemoveFromCart = [
  ...validateUserIdParam,
  ...validateProductIdParam,
];

const validateViewCart = validateUserIdParam;

module.exports = {
  validateAddToCart,
  validateUpdateCartItem,
  validateRemoveFromCart,
  validateViewCart,
  validateCheckout
};
