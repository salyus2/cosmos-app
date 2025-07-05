const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar nuevo usuario
exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Validar campos requeridos
    if (!username || !password) {
      return res.status(400).json({ message: 'Username y password requeridos' });
    }

    // Comprobar si el usuario ya existe
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = new User({ username, password: hashedPassword, role });
    await user.save();

    return res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    return res.status(500).json({ message: 'Error registrando usuario', error: err.message });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validar campos requeridos
    if (!username || !password) {
      return res.status(400).json({ message: 'Username y password requeridos' });
    }

    // Buscar usuario
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "8h" }
    );

    // Devolver token y datos básicos
    return res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        faction: user.faction || null
      }
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error en login', error: err.message });
  }
};