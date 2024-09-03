const express = require('express');
const router = express.Router();
const db = require('../../data/database'); 
const bcrypt = require('bcrypt');

router.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            res.status(500).json({ error: 'Error al consultar la base de datos' });
            return;
        }
        res.json(results);
    });
});

router.post('/usuarios/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            return res.status(500).json({ error: 'Error al consultar la base de datos' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        res.json({ message: 'Login exitoso', userId: user.id });
    });
});

router.post('/usuarios/regist', async (req, res) => {
    const { username, email, password } = req.body;

    // Verificar que todos los campos necesarios estén presentes
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    try {
        // Encriptar la contraseña
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Insertar el nuevo usuario en la base de datos
        db.query(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, passwordHash],
            (err, results) => {
                if (err) {
                    console.error('Error al insertar usuario:', err);
                    return res.status(500).json({ error: 'Error al insertar usuario' });
                }
                res.status(201).json({ message: 'Usuario creado exitosamente', userId: results.insertId });
            }
        );
    } catch (error) {
        console.error('Error al encriptar la contraseña:', error);
        return res.status(500).json({ error: 'Error al encriptar la contraseña' });
    }
});


module.exports = router;
