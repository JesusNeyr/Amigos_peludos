const db = require('../config/db/db.js');

const getCartByUserId = async (userId) => {
  const [cartRows] = await db.query('SELECT id FROM carts WHERE user_id = ?', [userId]);
  if (!cartRows.length) return null;

  const cartId = cartRows[0].id;
  const [items] = await db.query(`
    SELECT ci.product_id, p.name, p.price, ci.quantity
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.cart_id = ?
  `, [cartId]);

  return items;
};

const createCartIfNotExist = async (userId) => {
  const [cartRows] = await db.query('SELECT id FROM carts WHERE user_id = ?', [userId]);
  if (cartRows.length) return cartRows[0].id;

  const [result] = await db.query('INSERT INTO carts (user_id) VALUES (?)', [userId]);
  return result.insertId;
};

const getCartItem = async (cartId, productId) => {
  const [rows] = await db.query('SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?', [cartId, productId]);
  return rows[0];
};

const addCartItem = async (cartId, productId, quantity) => {
  const [result] = await db.query(
    'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)',
    [cartId, productId, quantity]
  );
  return result.insertId;
};

const updateCartItemQuantity = async (id, quantity) => {
  const [result] = await db.query('UPDATE cart_items SET quantity = ? WHERE id = ?', [quantity, id]);
  return result.affectedRows;
};

const updateCartItemQuantityByCartAndProduct = async (cartId, productId, quantity) => {
  const [result] = await db.query(
    'UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?',
    [quantity, cartId, productId]
  );
  return result.affectedRows;
};

const deleteCartItem = async (cartId, productId) => {
  const [result] = await db.query('DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?', [cartId, productId]);
  return result.affectedRows;
};

module.exports = {
  getCartByUserId,
  createCartIfNotExist,
  getCartItem,
  addCartItem,
  updateCartItemQuantity,
  updateCartItemQuantityByCartAndProduct,
  deleteCartItem,
};
