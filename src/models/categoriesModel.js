const db = require('../config/db/db.js');

const getAllCategories = async () => {
  const [rows] = await db.query('SELECT * FROM categories');
  return rows;
};

const getCategoryById = async (id) => {
  const [rows] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
  return rows[0];
};
const getProductsByCategoryId = (categoryId) => {
  const sql = `
    SELECT p.* FROM products p
    JOIN product_categories pc ON p.id = pc.product_id
    WHERE pc.category_id = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(sql, [categoryId], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};
const createCategory = async (category) => {
  const { name, description } = category;
  const [result] = await db.query(
    'INSERT INTO categories (name) VALUES (?)',
    [name, description]
  );
  return result.insertId;
};

const updateCategory = async (id, category) => {
  const { name, description } = category;
  const [result] = await db.query(
    'UPDATE categories SET name = ? WHERE id = ?',
    [name, id]
  );
  return result.affectedRows;
};

const deleteCategory = async (id) => {
  const [result] = await db.query('DELETE FROM categories WHERE id = ?', [id]);
  return result.affectedRows;
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategoryId,
};
