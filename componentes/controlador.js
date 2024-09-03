import { loginView, registerView, tokenView, welcomeView } from './vista.js';
import { addUser, loginUser } from '../intermediario.js';

// Controlador para manejar las vistas y eventos
document.addEventListener('DOMContentLoaded', function () {
    const app = document.getElementById('app');

    // Cargar vista de Login por defecto
    app.innerHTML = loginView();

    // Mostrar el formulario de registro y ocultar el de login
    document.addEventListener('click', async function (e) {
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
        if (e.target && e.target.id === 'loginForm') {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;

            try {
                const result = await loginUser(email, password);
                console.log('Login Data:', result);

                // Simular la verificación de acceso y mostrar el formulario de token
                app.innerHTML = tokenView();
            } catch (error) {
                console.error('Error en loginUser:', error);
            }
        } else if (e.target && e.target.id === 'registerForm') {
            e.preventDefault();
            const username = e.target.username.value;
            const email = e.target.email.value;
            const password = e.target.password.value;
            const confirmPassword = e.target.confirmPassword.value;

            if (password !== confirmPassword) {
                console.error('Las contraseñas no coinciden');
                return;
            }

            try {
                const result = await addUser(username, email, password);
                console.log('Register Data:', result);

                // Aquí podrías redirigir al usuario a la vista de login o mostrar un mensaje
                app.innerHTML = loginView();
            } catch (error) {
                console.error('Error en addUser:', error);
            }
        } else if (e.target && e.target.id === 'tokenForm') {
            e.preventDefault();
            const code = e.target.code.value;

            try {
                const result = await verifyToken(code);
                console.log('Token Data:', result);

                // Aquí podrías manejar la verificación del token
                app.innerHTML = welcomeView();
            } catch (error) {
                console.error('Error en verifyToken:', error);
            }
        }
    });
});
