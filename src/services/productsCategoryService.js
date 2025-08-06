const db = require('../config/db/db');

// ✅ CORREGIDO: nombre de tabla product_categories
const setProductCategories = async (productId, categoryIds) => {
  // Eliminamos relaciones anteriores
  await db.query('DELETE FROM product_categories WHERE product_id = ?', [productId]);

  // Insertamos nuevas relaciones
  const values = categoryIds.map(categoryId => [productId, categoryId]);
  if (values.length > 0) {
    await db.query('INSERT INTO product_categories (product_id, category_id) VALUES ?', [values]);
  }
};

const getProductsByCategoryId = async (categoryId) => {
  const [rows] = await db.query(
    `SELECT p.* 
     FROM products p
     JOIN product_categories pc ON p.id = pc.product_id
     WHERE pc.category_id = ?`,
    [categoryId]
  );
  return rows;
};

const getCategoriesByProductId = async (productId) => {
  const [rows] = await db.query(
    `SELECT c.* 
     FROM categories c
     JOIN product_categories pc ON c.id = pc.category_id
     WHERE pc.product_id = ?`,
    [productId]
  );
  return rows;
};

module.exports = {
  setProductCategories,
  getProductsByCategoryId,
  getCategoriesByProductId,
};
