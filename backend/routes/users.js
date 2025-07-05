const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Excluye password
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
});

// Crear usuario (ya lo tienes, pero lo dejamos aquí para referencia)
router.post('/', async (req, res) => {
  try {
    const { username, password, faction } = req.body;
    const user = new User({ username, password, faction });
    await user.save();
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ message: 'No se pudo crear el usuario', error: err.message });
  }
});

module.exports = router;