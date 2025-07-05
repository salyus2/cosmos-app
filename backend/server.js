require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Rutas (las crearemos después)
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const factionRoutes = require('./routes/factions');

const app = express();

// Middlewares
app.use(cors({
  origin: '*', // Cambia esto por el origen real en producción
  credentials: true
}));
app.use(express.json());

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/factions', factionRoutes);

// Conexión a MongoDB
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cosmos';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error conectando a MongoDB:', err);
  });