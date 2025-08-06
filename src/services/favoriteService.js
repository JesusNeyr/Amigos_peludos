const db = require('../../db');

// Agregar un producto a favoritos
const addFavorite = async (userId, productId) => {
  const [existing] = await db.query(
    'SELECT * FROM favorites WHERE user_id = ? AND product_id = ?',
    [userId, productId]
  );

  if (existing.length > 0) {
    throw new Error('El producto ya está en favoritos');
  }

  await db.query(
    'INSERT INTO favorites (user_id, product_id) VALUES (?, ?)',
    [userId, productId]
  );
};

// Eliminar un producto de favoritos
const removeFavorite = async (userId, productId) => {
  await db.query(
    'DELETE FROM favorites WHERE user_id = ? AND product_id = ?',
    [userId, productId]
  );
};

// Obtener favoritos de un usuario
const getFavoritesByUser = async (userId) => {
  const [favorites] = await db.query(
    `SELECT p.* FROM products p
     INNER JOIN favorites f ON p.id = f.product_id
     WHERE f.user_id = ?`,
    [userId]
  );
  return favorites;
};

module.exports = {
  addFavorite,
  removeFavorite,
  getFavoritesByUser,
};
