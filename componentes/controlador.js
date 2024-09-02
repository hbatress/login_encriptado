import { loginView, registerView, tokenView, welcomeView } from './vista.js';
import { login, register, verifyToken } from '../intermediario.js';

// Controlador para manejar las vistas y eventos
document.addEventListener('DOMContentLoaded', function () {
    const app = document.getElementById('app');

    // Cargar vista de Login por defecto
    app.innerHTML = loginView();

    // Mostrar el formulario de registro y ocultar el de login
    document.addEventListener('click', function (e) {
        if (e.target && e.target.id === 'showRegister') {
            e.preventDefault();
            app.innerHTML = registerView();
        } else if (e.target && e.target.id === 'showLogin') {
            e.preventDefault();
            app.innerHTML = loginView();
        }
    });

    // Manejar el envío del formulario de login
    document.addEventListener('submit', async function (e) {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario

        if (e.target && e.target.id === 'loginForm') {
            const email = e.target.email.value;
            const password = e.target.password.value;

            console.log('Login Data:', { email, password });

            try {
                const result = await login(email, password);
                console.log('Respuesta del servidor:', result);

                // Suponiendo que si el login es exitoso, mostramos el formulario de token
                app.innerHTML = tokenView();
            } catch (error) {
                console.error('Error:', error);
            }

        } else if (e.target && e.target.id === 'registerForm') {
            const username = e.target.username.value;
            const email = e.target.email.value;
            const password = e.target.password.value;
            const confirmPassword = e.target.confirmPassword.value;

            console.log('Register Data:', { username, email, password, confirmPassword });

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            try {
                const result = await register(username, email, password);
                console.log('Respuesta del servidor:', result);

                // Puedes manejar la respuesta del servidor aquí (mostrar mensajes, redireccionar, etc.)
            } catch (error) {
                console.error('Error:', error);
            }

        } else if (e.target && e.target.id === 'tokenForm') {
            const code = e.target.code.value;

            console.log('Token Data:', { code });

            try {
                const result = await verifyToken(code);
                console.log('Respuesta del servidor:', result);

                // Maneja la respuesta del servidor aquí (mostrar mensajes, redireccionar, etc.)
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });
});
