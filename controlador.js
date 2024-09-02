import { loginView, registerView, tokenView } from './vista.js';

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
        }
    });

    // Mostrar el formulario de login y ocultar el de registro
    document.addEventListener('click', function (e) {
        if (e.target && e.target.id === 'showLogin') {
            e.preventDefault();
            app.innerHTML = loginView();
        }
    });

    // Simular la verificación de acceso y mostrar el formulario de token
    document.addEventListener('submit', function (e) {
        if (e.target && e.target.id === 'loginForm') {
            e.preventDefault();
            app.innerHTML = tokenView();
        }
    });
});
