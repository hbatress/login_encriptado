import { loginView, registerView, tokenView, welcomeView } from './vista.js';

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
    document.addEventListener('submit', function (e) {
        if (e.target && e.target.id === 'loginForm') {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;

            console.log('Login Data:', { email, password });

            // Simular la verificación de acceso y mostrar el formulario de token
            app.innerHTML = tokenView();
        } else if (e.target && e.target.id === 'registerForm') {
            e.preventDefault();
            const username = e.target.username.value;
            const email = e.target.email.value;
            const password = e.target.password.value;
            const confirmPassword = e.target.confirmPassword.value;

            console.log('Register Data:', { username, email, password, confirmPassword });

            // Aquí podrías realizar la lógica para manejar el registro
        } else if (e.target && e.target.id === 'tokenForm') {
            e.preventDefault();
            const code = e.target.code.value;

            console.log('Token Data:', { code });

            // Aquí podrías realizar la lógica para manejar la verificación del token
        }
    });
});
