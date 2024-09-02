require('dotenv').config(); // Cargar variables de entorno desde .env
const mysql = require('mysql2');

// Configura los detalles de tu base de datos usando las variables de entorno
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Conecta a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos.');
});

module.exports = connection;
