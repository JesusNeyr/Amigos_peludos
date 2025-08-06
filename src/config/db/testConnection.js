const db = require('./db.js');

async function testConnection() {
  try {
    const [rows] = await db.query('SELECT NOW() AS now');
    console.log('✅ Conexión exitosa a la base de datos. Hora actual:', rows[0].now);
  } catch (error) {
    console.error('❌ Error conectando a la base de datos:', error.message);
  }
}

testConnection();
