const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Rutas
const factionRoutes = require('./routes/factions');
const userRoutes = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB (opciones limpias)
mongoose.connect('mongodb://localhost:27017/cosmosdb');

// Rutas API
app.use('/api/factions', factionRoutes);
app.use('/api/users', userRoutes); // <- rutas de usuarios

// Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
});