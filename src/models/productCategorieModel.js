const db = require('../config/db/db.js');

// Asignar una o varias categorías a un producto
const assignCategoriesToProduct = async (productId, categoryIds) => {
  const values = categoryIds.map(catId => [productId, catId]);
  // Insert múltiples filas
  const [result] = await db.query(
    'INSERT INTO product_categories (product_id, category_id) VALUES ?',
    [values]
  );
  return result.affectedRows;
};

// Quitar todas las categorías de un producto (para actualizar)
const removeCategoriesFromProduct = async (productId) => {
  const [result] = await db.query(
    'DELETE FROM product_categories WHERE product_id = ?',
    [productId]
  );
  return result.affectedRows;
};

// Obtener categorías de un producto
const getCategoriesByProductId = async (productId) => {
  const [rows] = await db.query(
    `SELECT c.* FROM categories c
     JOIN product_categories pc ON c.id = pc.category_id
     WHERE pc.product_id = ?`,
    [productId]
  );
  return rows;
};

// Obtener productos de una categoría
const getProductsByCategoryId = async (categoryId) => {
  const [rows] = await db.query(
    `SELECT p.* FROM products p
     JOIN product_categories pc ON p.id = pc.product_id
     WHERE pc.category_id = ?`,
    [categoryId]
  );
  return rows;
};

module.exports = {
  assignCategoriesToProduct,
  removeCategoriesFromProduct,
  getCategoriesByProductId,
  getProductsByCategoryId,
};
