require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Rutas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const factionRoutes = require('./routes/factions');

// Crear app express
const app = express();

// Middleware globales
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/factions', factionRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

// Conexión a MongoDB y arranque del servidor
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/myapp';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error conectando a MongoDB:', err.message);
  });