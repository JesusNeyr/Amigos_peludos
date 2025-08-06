const db = require('../config/db/db.js');
const bcrypt = require('bcryptjs');

const findUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

const createUser = async (user) => {
  const { name, email, password, role = 'cliente' } = user;
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await db.query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, hashedPassword, role]
  );
  return result.insertId;
};
const getAllUsers = async () => {
  const [rows] = await db.query('SELECT * FROM users');
  return rows;
};
const findUserById = async (id) => {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};
const deleteUser = async (id) => {
  const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
  return result;
};


module.exports = {
  findUserByEmail,
  createUser,
  getAllUsers,
  findUserById,
  deleteUser,
};
