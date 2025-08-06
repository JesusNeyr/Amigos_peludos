const usersService = require('../../services/usersService.js');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const userId = await usersService.registerUser(req.body);
    res.status(201).json({ message: 'Usuario registrado', id: userId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usersService.loginUser(email, password);

    // Generar token JWT (firma con secret)
    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ message: 'Login exitoso', token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAllUsers();
    // Quitar datos sensibles, por ejemplo password
    const sanitizedUsers = users.map(({ password, ...rest }) => rest);
    res.json(sanitizedUsers);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = parseInt(id);

    // Verificamos si es admin o el mismo usuario
    if (req.user.role !== 'admin' && req.user.id !== userId) {
      return res.status(403).json({ error: 'No autorizado' });
    }

    const user = await usersService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const { password, ...sanitizedUser } = user;
    res.json(sanitizedUser);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updated = await usersService.updateUser(id, updates);
    if (updated) {
      res.json({ message: 'Usuario actualizado correctamente' });
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }

};
const deleteUser=async (req, res) => {
  try {
    const { id } = req.params;
    await usersService.deleteUser(id);
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
}

module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
