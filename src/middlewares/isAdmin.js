// Middleware de verificação de admin
module.exports = (req, res, next) => {
  // Adapte esta lógica à sua autenticação
  if (req.user && req.user.role === 'admin') {
    return next(); // Usuário é admin, continue
  }
  
  // Se não for admin, retorne erro
  res.status(403).json({ 
    error: 'Acesso negado: requer privilégios de administrador' 
  });
};