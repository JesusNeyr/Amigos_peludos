const db = require('../config/db/db'); // o donde tengas tu conexión MySQL

const FavoriteModel = {
  getFavoritesByUser: async (userId) => {
    const [rows] = await db.execute(
      `SELECT p.* FROM products p
       JOIN favorites f ON p.id = f.product_id
       WHERE f.user_id = ?`,
      [userId]
    );
    return rows;
  },

  addFavorite: async (userId, productId) => {
    await db.execute(
      'INSERT INTO favorites (user_id, product_id) VALUES (?, ?)',
      [userId, productId]
    );
  },

  removeFavorite: async (userId, productId) => {
    await db.execute(
      'DELETE FROM favorites WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );
  },
};

module.exports = FavoriteModel;
