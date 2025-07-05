const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Obtener todos los usuarios (solo admin)
router.get('/', auth, userController.getAllUsers);

// Obtener usuario por id (propio o admin)
router.get('/:id', auth, userController.getUserById);

// Actualizar usuario (propio o admin)
router.put('/:id', auth, userController.updateUser);

// Eliminar usuario (solo admin)
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;