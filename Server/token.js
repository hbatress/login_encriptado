function generarToken() {
    // Generar un número aleatorio de 5 dígitos
    const token = Math.floor(10000 + Math.random() * 90000);
    return token.toString(); // Convertir a string para facilitar su uso
}

// Exportar la función
module.exports = generarToken;