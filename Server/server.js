const express = require('express');
const path = require('path');
const route = require('./router/router');

const app = express();
const port = 3000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Agrega esta línea para procesar JSON
// Usar rutas definidas
app.use('/', route);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
