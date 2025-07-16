// middlewares/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {  // Agora adiciona um objeto user completo
      id: decoded.userId,
      // outros campos do usuário se necessário
    };
    next();
  } catch (error) {
    res.status(400).json({ error: 'Token inválido' });
  }
};