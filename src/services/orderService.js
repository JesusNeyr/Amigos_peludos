const db = require('../config/db/db');

const getOrderHistoryByUserId = async (userId) => {
  const [orders] = await db.query(`
    SELECT o.id AS order_id, o.created_at, o.total_price, pm.name AS payment_method
    FROM orders o
    JOIN payment_methods pm ON o.payment_method_id = pm.id
    WHERE o.user_id = ?
    ORDER BY o.created_at DESC
  `, [userId]);

  for (const order of orders) {
    const [items] = await db.query(`
      SELECT p.name, oi.quantity, oi.price_at_sale
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `, [order.order_id]);
    
    order.items = items;
  }

  return orders;
};
const getBestSellingProducts = async (limit = 10) => {
  const [results] = await db.query(`
    SELECT 
      p.id,
      p.name,
      p.description,
      p.price,
      p.discount,
      p.stock,
      p.image_url,
      SUM(oi.quantity) AS total_vendidos
    FROM products p
    JOIN order_items oi ON p.id = oi.product_id
    JOIN orders o ON oi.order_id = o.id
    WHERE o.status = 'entregado'
    GROUP BY p.id, p.name, p.description, p.price, p.discount, p.stock, p.image_url
    ORDER BY total_vendidos DESC
    LIMIT ?
  `, [limit]);

  return results;
};

module.exports = {
  getOrderHistoryByUserId,
  getBestSellingProducts,
};

