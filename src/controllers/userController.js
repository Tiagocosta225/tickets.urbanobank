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
    // Sua lógica aqui
    res.status(200).json({ message: "Update de usuário" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.deleteUser = (req, res) => {
  try {
    // Sua lógica aqui
    res.status(200).json({ message: "Delete User" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Verificação imediata
console.log('getAllUsers is function?', 
  typeof module.exports.getAllUsers === 'function');