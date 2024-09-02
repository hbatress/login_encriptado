const express = require('express');
const router = express.Router();
const db = require('../db'); // Importa la conexión a la base de datos

// Ruta de ejemplo para API
router.get('/api/data', (req, res) => {
    db.query('SELECT * FROM your_table', (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            res.status(500).json({ error: 'Error al consultar la base de datos' });
            return;
        }
        res.json(results);
    });
});

module.exports = router;
