const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 8005;

// Middleware de autenticación
const authenticateUser = (req, res, next) => {
  // Aquí debes implementar la lógica de verificación de autenticación,
  // por ejemplo, verificar si el token JWT es válido y está presente en la solicitud.
  const token = req.headers.authorization; // Obtener el token de la solicitud

  // Si el token no está presente o no es válido, devolver un error de no autorizado
  if (!token || !isValidToken(token)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Si el token es válido, permite continuar con la solicitud
  next();
};

// Middleware de verificación de token (solo un ejemplo, debes implementar tu propia lógica aquí)
const isValidToken = (token) => {
  // Aquí debes implementar la lógica de verificación del token JWT
  // Esta función debería verificar si el token es válido y no está expirado
  // Además, puede realizar otras verificaciones según tu lógica de autenticación
  // Por simplicidad, este es solo un ejemplo básico.
  return token === 'token_valido'; // Debes implementar tu lógica de verificación real aquí
};

// Middleware de autenticación aplicado a todas las rutas proxy
app.use(authenticateUser);

// Rutas proxy
// ... (tus rutas proxy existentes aquí)

// Resto de tu código sigue igual...

app.listen(port, () => {
  console.log(`Api Gateway service listening at http://127.0.0.1:${port}`);
});
