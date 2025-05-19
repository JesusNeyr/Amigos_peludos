const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const db=require('./src/config/db');
// Ejemplo de ruta inicial
app.get('/', (req, res) => {
  res.send('API Amigos Peludos funcionando 🐶');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
