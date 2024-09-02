const express = require('express');
const path = require('path');
const homeRoutes = require('./routes/homeRoutes');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const port = 3000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Usar rutas definidas
app.use('/', homeRoutes);
app.use('/api', apiRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
