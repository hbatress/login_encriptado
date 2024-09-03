const express = require('express');
const router = express.Router();
const db = require('../../data/database'); 
const bcrypt = require('bcrypt');
const enviarCorreo = require('../sms');
const generarToken = require('../token');


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

router.post('/api/tokens', async (req, res) => {
    try {
        const { user_id, destinatario } = req.body;

        if (!user_id || !destinatario) {
            return res.status(400).json({ error: 'Faltan parámetros' });
        }

        const token = generarToken();

        // Calcular la hora de expiración (60 segundos desde ahora)
        const expirationTime = new Date(Date.now() + 60 * 1000); // 60 segundos = 60 * 1000 milisegundos

        const query = 'INSERT INTO mfa_tokens (user_id, token, expiration_time) VALUES (?, ?, ?)';
        const values = [user_id, token, expirationTime];

        // Usar una promesa para manejar la consulta de base de datos
        await new Promise((resolve, reject) => {
            db.query(query, values, (err, results) => {
                if (err) {
                    return reject(err); // Rechazar la promesa si hay un error
                }
                resolve(results); // Resolver la promesa si la consulta es exitosa
            });
        });

        // Enviar el correo con el token
        enviarCorreo(destinatario, token);

        res.status(201).json({ message: 'Token guardado y correo enviado', token });

    } catch (error) {
        console.error('Error al guardar el token:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


router.post('/api/verify-token', async (req, res) => {
    try {
        const { user_id, token } = req.body;

        if (!user_id || !token) {
            return res.status(400).json({ error: 'Faltan parámetros' });
        }

        // Consultar la base de datos para encontrar el token
        const query = 'SELECT * FROM mfa_tokens WHERE user_id = ? AND token = ? AND expiration_time > NOW()';
        const values = [user_id, token];

        // Usar una promesa para manejar la consulta de base de datos
        const result = await new Promise((resolve, reject) => {
            db.query(query, values, (err, results) => {
                if (err) {
                    return reject(err); // Rechazar la promesa si hay un error
                }
                resolve(results); // Resolver la promesa si la consulta es exitosa
            });
        });

        // Verificar si se encontró un resultado
        if (result.length > 0) {
            res.status(200).json({ message: 'Token válido' });
        } else {
            res.status(400).json({ error: 'Token inválido o expirado' });
        }

    } catch (error) {
        console.error('Error al verificar el token:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});



module.exports = router;
