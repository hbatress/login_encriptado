// vista.js

export function loginView() {
    return `
        <div id="login" class="container p-4 rounded fondo2" style="max-width: 400px;">
            <h2 class="text-center">Login</h2>
            <form id="loginForm" action="#" method="post">
                <div class="mb-3">
                    <input type="email" id="email" name="email" class="form-control" required placeholder="Email">
                </div>
                <div class="mb-3">
                    <input type="password" id="password" name="password" class="form-control" required placeholder="Password">
                </div>
                <div class="mb-3">
                    <p class="text-center mt-2 mb-0"><a href="#" class="link-info text-decoration-none">Forgot password</a></p>
                </div>
                <button type="submit" class="btn btn-primary w-100 text-bg-primary p-6">Entrar</button>
                <p class="text-center mt-2 mb-0">Don't have an account? <a href="#" class="link-info text-decoration-none" id="showRegister">Signup</a></p>
            </form>
        </div>

    `;
}

export function registerView() {
    return `
        <div id="register" class="container p-4 rounded fondo2" style="max-width: 400px;">
            <h2 class="text-center">Register</h2>
            <form id="registerForm" action="#" method="post">
                <div class="mb-3">
                    <input type="text" id="username" name="username" class="form-control" required placeholder="Username">
                </div>
                <div class="mb-3">
                    <input type="email" id="email" name="email" class="form-control" required placeholder="Email">
                </div>
                <div class="mb-3">
                    <input type="password" id="password" name="password" class="form-control" required placeholder="Password">
                </div>
                <div class="mb-3">
                    <input type="password" id="confirmPassword" name="confirmPassword" class="form-control" required placeholder="Confirm Password">
                </div>
                <button type="submit" class="btn btn-primary w-100 text-bg-primary p-6">Register</button>
                <p class="text-center mt-2 mb-0">Do you have an account? <a href="#" class="link-info text-decoration-none" id="showLogin">Login</a></p>
            </form>
        </div>
    `;
}

export function tokenView() {
    return `
        <div id="token" class="container p-4 rounded fondo2" style="max-width: 400px;">
            <h2 class="text-center">Check Code</h2>
            <form id="tokenForm" action="#" method="post">
                <div class="mb-3">
                    <input type="text" id="code" name="code" class="form-control" required placeholder="Code">
                </div>
                <div class="mb-3">
                    <p class="text-center mt-2 mb-0"><a href="#" class="link-info text-decoration-none">Resend code</a></p>
                </div>
                <button type="submit" class="btn btn-primary w-100 text-bg-primary p-6">Verify</button>
                <p class="text-center mt-2 mb-0">Try question <a href="#" class="link-info text-decoration-none">click here</a></p>
            </form>
        </div>
    `;
}

export function welcomeView() {
    return `
        <div id="welcome" class="container p-4 rounded fondo2 text-center" style="max-width: 600px;">
            <h1 class="display-4">Welcome!</h1>
            <p class="lead">Thank you for visiting our website.</p>
        </div>
    `;
}
