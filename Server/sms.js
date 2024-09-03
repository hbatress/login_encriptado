const nodemailer = require('nodemailer');
require('dotenv').config(); 

function enviarCorreo(destinatario, mensaje) {
    // Obtener credenciales desde variables de entorno
    const miuser = process.env.EMAIL_USER;
    const passwordApp = process.env.EMAIL_PASSWORD;

    // Crear el transportador de correo
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: miuser,
            pass: passwordApp,
        },
    });

    // Configurar las opciones del correo
    const mailOptions = {
        from: miuser,      // CORREO ORIGEN
        to: destinatario,  // CORREO DESTINO
        subject: "Codigo de Verificacion",   // Asunto del correo
        text: `Este es el codigo de verificacion: ${mensaje}`,     // Cuerpo del correo
    };

    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error al enviar el correo: ", error);
        } else {
            console.log("Correo enviado: " + info.response);
        }
    });
}

module.exports = enviarCorreo;