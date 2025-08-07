const db = require('../config/db/db.js');

const getAllProducts = async () => {
  try{
    const [rows] = await db.query('SELECT * FROM products');
    return rows;

  }catch(err){
    console.error('error en modul products',err)
    throw err;
  }
};

const getProductById = async (id) => {
  const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
  return rows[0];
};

const createProduct = async (product) => {
  const { name, description, price, stock, discount, is_best_seller, image_url } = product;
  const [result] = await db.query(
    'INSERT INTO products (name, description, price, stock, discount, is_best_seller, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, description, price, stock, discount, is_best_seller, image_url]
  );
  return result.insertId;
};

const updateProduct = async (id, product) => {
  const { name, description, price, stock, discount, is_best_seller, image_url } = product;
  const [result] = await db.query(
    `UPDATE products SET name = ?, description = ?, price = ?, stock = ?, discount = ?, is_best_seller = ?, image_url = ? WHERE id = ?`,
    [name, description, price, stock, discount, is_best_seller, image_url, id]
  );
  return result.affectedRows;
};

const deleteProduct = async (id) => {
  const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
  return result.affectedRows;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

