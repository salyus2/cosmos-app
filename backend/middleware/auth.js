const jwt = require('jsonwebtoken');

// Middleware para verificar autenticación y extraer datos del usuario
module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Espera formato: "Bearer <token>"
  const [type, token] = authHeader.split(' ');
  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Formato de token inválido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};