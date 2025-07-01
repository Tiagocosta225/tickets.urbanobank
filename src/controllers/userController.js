// src/controllers/userController.js
const getUserList = () => [{ id: 1, name: "Test User" }];
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createUser = async (req, res) => {
    try {
      console.log('Dados recebidos:', req.body);
      const { name, email, password } = req.body;

      // Validação básica
      if (!name || !email || !password) {
        return res.status(400).json({ error: "Dados incompletos" });
      }

      // Cria o usuário no banco
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password,
          role: 'USER' // Define um valor padrão
        }
      });

      // Retorna resposta (sem a senha)
      const { password: _, ...userData } = newUser;
      res.status(201).json(userData);

    } catch (error) {
    console.error('Erro detalhado:', error);
    return res.status(400).json({ error: error.message });
  }
  };


module.exports.getAllUsers = (req, res) => {
  try {
    const users = getUserList();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = (req, res) => {
  try {
    res.status(200).json({ message: "Update de usuário" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({
      where: { id: Number(id) }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Tenta deletar
    const deletedUser = await prisma.user.delete({
      where: { id: Number(id) }
    });

    console.log('Usuário deletado com sucesso');
    return res.status(200).json({
      message: "Usuário deletado",
      deletedUser: { 
        id: deletedUser.id,
        email: deletedUser.email
      }
    });
    
  } catch (error) {
    console.error('Erro ao deletar:', error);
    
    // Tratamento específico para constraints
    if (error.code === 'P2003') {
      return res.status(400).json({ 
        error: "Não é possível deletar: usuário possui registros relacionados",
        solution: "Delete os comentários primeiro ou altere as constraints do banco"
      });
    }
    
    return res.status(500).json({ 
      error: "Erro interno ao deletar usuário",
      details: error.message
    });
  }
}

// Verificação imediata
console.log('getAllUsers is function?', 
  typeof module.exports.getAllUsers === 'function');