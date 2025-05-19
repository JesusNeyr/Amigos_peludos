const mysql=require('mysql2');
require('dotenv').config();

const connection=mysql.createConnection({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password: process.env.DN_PASSWORD,
    database:process.env.DB_NAME,
});

connection.connect((err)=>{
    if (err){
        console.error('Error de conexion a MySQL', err.message);
    }else{
        console.log('✅ Conectado a la base de datos MySQL')
    }
})

module.exports=connection;
