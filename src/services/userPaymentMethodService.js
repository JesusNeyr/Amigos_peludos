const db = require('../config/db/db');

const getAllByUser = async (userId) => {
  const [rows] = await db.query(
    `SELECT upm.id, upm.payment_method_id, pm.name AS payment_method 
     FROM user_payment_methods upm
     JOIN payment_methods pm ON upm.payment_method_id = pm.id
     WHERE upm.user_id = ?`, 
    [userId]
  );
  return rows;
};


const add = async (userId, paymentMethodId) => {
  const [result] = await db.query(
    `INSERT INTO user_payment_methods (user_id, payment_method_id) VALUES (?, ?)`,
    [userId, paymentMethodId]
  );
  return { id: result.insertId };
};

const remove = async (id, userId) => {
  const [result] = await db.query(
    `DELETE FROM user_payment_methods WHERE id = ? AND user_id = ?`,
    [id, userId]
  );
  return result.affectedRows > 0;
};

module.exports = {
  getAllByUser,
  add,
  remove,
};
