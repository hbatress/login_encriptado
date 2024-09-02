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
router.post('/usuarios', (req, res) => {
    const { username, email, password_hash } = req.body;

    if (!username || !email || !password_hash) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    db.query(
        'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
        [username, email, password_hash],
        (err, results) => {
            if (err) {
                console.error('Error al insertar usuario:', err);
                res.status(500).json({ error: 'Error al insertar usuario' });
                return;
            }
            res.status(201).json({ message: 'Usuario creado exitosamente', userId: results.insertId });
        }
    );
});

module.exports = router;
