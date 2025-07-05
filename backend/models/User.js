const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  faction: {
    type: String, // Guarda el nombre de la facción
    required: true
  },
  // Puedes añadir más campos aquí si los necesitas, como 'role', 'email', etc.
});

module.exports = mongoose.model('User', UserSchema);