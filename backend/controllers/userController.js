const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios (solo admin)
exports.getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Solo admin puede ver todos los usuarios' });
    }
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo usuarios', error: err.message });
  }
};

// Obtener datos de un usuario por id (propio o admin)
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.role !== 'admin' && req.user.id !== id) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }
    const user = await User.findById(id, '-password');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error obteniendo usuario', error: err.message });
  }
};

// Actualizar usuario (propio o admin)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.role !== 'admin' && req.user.id !== id) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }
    const data = { ...req.body };
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    // Solo admin puede cambiar role o faction
    if (req.user.role !== 'admin') {
      delete data.role;
      delete data.faction;
    }
    const user = await User.findByIdAndUpdate(id, data, { new: true, select: '-password' });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error actualizando usuario', error: err.message });
  }
};

// Eliminar usuario (solo admin)
exports.deleteUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Solo admin puede eliminar usuarios' });
    }
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error eliminando usuario', error: err.message });
  }
};