const express = require("express");
const router = express.Router();
const factionController = require("../controllers/factionController");
const auth = require("../middleware/auth");

// Obtener todas las facciones (ruta pública)
router.get("/", factionController.getAllFactions);

// Crear facción (solo admin)
router.post("/", auth, factionController.createFaction);

// Asignar facción a usuario (solo admin)
router.post("/assign", auth, factionController.assignFaction);

module.exports = router;
