const mongoose = require('mongoose');

const FactionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
});

module.exports = mongoose.model('Faction', FactionSchema);