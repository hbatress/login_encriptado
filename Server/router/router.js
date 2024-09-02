const express = require('express');
const router = express.Router();
const db = require('../../data/database'); 

router.get('/usuarios', (req, res) => {
    // Consulta a la base de datos para seleccionar todos los usuarios
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            res.status(500).json({ error: 'Error al consultar la base de datos' });
            return;
        }
        res.json(results);
    });
});


module.exports = router;
