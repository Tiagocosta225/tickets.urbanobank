const jwt = require('jsonwebtoken');
const prisma = require('../prisma');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Valide os campos
    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    // 2. Busque o usuário
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    // 3. Verifique a senha (simplificado - use bcrypt na prática)
    if (user.password !== password) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    // 4. Gere o token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'segredo_temporario',
      { expiresIn: '1h' }
    );

    // 5. Retorne o token
    res.json({ token });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};