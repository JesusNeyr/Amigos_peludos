require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

// Escuchar en 0.0.0.0 para que funcione en Railway
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});
