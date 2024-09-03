const express = require('express');
const path = require('path');
const cors = require('cors'); // Importa el paquete cors
const router = require('./router/router');

const app = express();
const port = 3000;

// Middleware para permitir CORS
app.use(cors({
    origin: 'http://127.0.0.1:5500' // Reemplaza con el origen permitido
}));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Para procesar JSON
app.use('/', router);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
