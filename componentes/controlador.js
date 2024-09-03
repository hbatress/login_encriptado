import { loginView, registerView, tokenView, welcomeView } from './vista.js';
import { addUser, loginUser,createToken,verifyToken } from '../intermediario.js';
import { setCookie, getCookie, eraseCookie } from '../cookieUtils.js';

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
        } else if(e.target && e.target.id==='advertencia'){
            e.preventDefault();
            app.innerHTML = advertencia();
        }
    });
    

    function showError(message) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#d33'
        });
    }

    // Manejar el envío del formulario de login
    document.addEventListener('submit', async function (e) {
        if (e.target && e.target.id === 'loginForm') {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
    
            // Verificar si los campos están vacíos
            if (!email || !password) {
                showError('Por favor, complete todos los campos.');
                return;
            }
    
            try {
                const result = await loginUser(email, password);
                console.log('Login Data:', result);
    
        // Guardar ID, correo y contraseña en cookies (NO recomendado para contraseñas)
        setCookie('user_id', result.userId, 1); // Guardar por 1 día
        setCookie('email', email, 1); // Guardar por 1 día
        setCookie('password', password, 1); // NO recomendado

            // Si el inicio de sesión es exitoso, generar y enviar el token
            const user_id = result.userId; // Asegúrate de ajustar esto según tu respuesta del servidor
            console.log('ID:', user_id);
            await createToken(user_id, email);
            console.log('Token generado y enviado al correo electrónico.');

                // Simular la verificación de acceso y mostrar el formulario de token
                app.innerHTML = tokenView();
            } catch (error) {
                console.error('Error en loginUser:', error);
                showError('Contraseña o correo electrónico incorrecto.');
            }

        } else if (e.target && e.target.id === 'registerForm') {
            e.preventDefault();
            const username = e.target.username.value;
            const email = e.target.email.value;
            const password = e.target.password.value;
            const confirmPassword = e.target.confirmPassword.value;
    
            // Verificar si los campos están vacíos
            if (!username || !email || !password || !confirmPassword) {
                showError('Por favor, complete todos los campos.');
                return;
            }
    
            // Verificar si las contraseñas coinciden
            if (password !== confirmPassword) {
                showError('Las contraseñas no coinciden.');
                return;
            }
    
            try {
                const result = await addUser(username, email, password);
                console.log('Register Data:', result);
    
                // Aquí podrías redirigir al usuario a la vista de login o mostrar un mensaje
                app.innerHTML = welcomeView();
            } catch (error) {
                console.error('Error en addUser:', error);
                showError('Error al registrar el usuario. Inténtalo de nuevo.');
            }
        } else if (e.target && e.target.id === 'tokenForm') {
            e.preventDefault();
            const code = e.target.code.value;
    
            // Verificar si el campo del código está vacío
            if (!code) {
                showError('Por favor, ingrese el código de verificación.');
                return;
            }
        // Leer ID y correo de las cookies
        const userId = getCookie('user_id');
        const email = getCookie('email');
            try {
                const result = await verifyToken(userId, code);
                console.log('Token Data:', result);
    
                // Aquí podrías manejar la verificación del token
                if (result.message === 'Token válido') {
                    app.innerHTML = welcomeView(); // Muestra la vista de bienvenida
                } else {
                    showError('Código de verificación incorrecto o expirado.');
                }
            } catch (error) {
                console.error('Error en verifyToken:', error);
                showError('Código de verificación incorrecto.');
            }
        }
    });
});
