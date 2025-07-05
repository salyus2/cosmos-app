const User = require('../models/User');
const Faction = require('../models/Faction');

// Crear un nuevo usuario y asignarle una facción
exports.createUser = async (req, res) => {
  try {
    const { username, password, faction } = req.body;

    if (!username || !password || !faction) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Verifica que la facción exista
    const existingFaction = await Faction.findOne({ name: faction });
    if (!existingFaction) {
      return res.status(404).json({ message: 'La facción no existe' });
    }

    // Crear y guardar el nuevo usuario
    const newUser = new User({
      username,
      password, // OJO: para seguridad real, deberías hashear la contraseña
      faction
    });

    await newUser.save();

    // No devuelvas la contraseña en la respuesta
    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
      faction: newUser.faction
    };

    res.status(201).json({ message: 'Usuario creado', user: userResponse });
  } catch (err) {
    res.status(500).json({ message: 'Error al crear usuario', error: err.message });
  }
};