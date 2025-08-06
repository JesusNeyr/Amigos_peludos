const db = require('../config/db/db.js');
const userModel = require('../models/usersModels.js');
const bcrypt = require('bcryptjs');

const registerUser = async (userData) => {
  const existingUser = await userModel.findUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('El correo ya está registrado');
  }
  const userId = await userModel.createUser(userData);
  return userId;
};

const loginUser = async (email, password) => {
  const user = await userModel.findUserByEmail(email);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error('Contraseña incorrecta');
  }
  return user; // aquí luego generaremos el token JWT
};
const getAllUsers = () => {
  return userModel.getAllUsers();
};
const getUserById = async (id) => {
  return await userModel.findUserById(id);
};
const updateUser = async (id, updates) => {
  const fields = [];
  const values = [];

  for (const key in updates) {
    fields.push(`${key} = ?`);
    values.push(updates[key]);
  }

  values.push(id);

  const [result] = await db.query(
    `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
    values
  );

  return result.affectedRows > 0;
};
const deleteUser = async (id) => {
  return await userModel.deleteUser(id);
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
