const Faction = require("../models/Faction");
const User = require("../models/User");

// Obtener todas las facciones
exports.getAllFactions = async (req, res) => {
  try {
    const factions = await Faction.find();
    res.json(factions);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error obteniendo facciones", error: err.message });
  }
};

// Crear facción (solo admin)
exports.createFaction = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Solo admin puede crear facciones" });
    }
    const { name, description } = req.body;
    const exists = await Faction.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "La facción ya existe" });
    }
    const faction = new Faction({ name, description });
    await faction.save();
    res.status(201).json(faction);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creando facción", error: err.message });
  }
};

// Asignar facción a usuario (solo admin)
exports.assignFaction = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Solo admin puede asignar facciones" });
    }
    const { userId, factionName } = req.body;
    const faction = await Faction.findOne({ name: factionName });
    if (!faction) {
      return res.status(404).json({ message: "Facción no encontrada" });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { faction: factionName },
      { new: true, select: "-password" }
    );
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error asignando facción", error: err.message });
  }
};
