// Función para realizar la solicitud POST para agregar un nuevo usuario
export async function addUser(username, email, password) {
    try {
        const response = await fetch('http://localhost:3000/usuarios/regist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        return await response.json();
    } catch (error) {
        console.error('Error en addUser:', error);
        throw error;
    }
}

// Función para realizar la solicitud POST para iniciar sesión
export async function loginUser(email, password) {
    try {
        const response = await fetch('http://localhost:3000/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        return await response.json();
    } catch (error) {
        console.error('Error en loginUser:', error);
        throw error;
    }
}
// Función para realizar la solicitud POST para crear un token
export async function createToken(user_id, destinatario) {
    try {
        const response = await fetch('http://localhost:3000/api/tokens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id, destinatario })
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        return await response.json();
    } catch (error) {
        console.error('Error en createToken:', error);
        throw error;
    }
}

// Función para realizar la solicitud POST para verificar un token
export async function verifyToken(user_id, token) {
    try {
        const response = await fetch('http://localhost:3000/api/verify-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id, token })
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        return await response.json();
    } catch (error) {
        console.error('Error en verifyToken:', error);
        throw error;
    }
}
