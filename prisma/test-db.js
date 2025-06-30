const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    const users = await prisma.user.findMany(); // Substitua "user" pelo seu modelo
    console.log('Dados:', users);
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();