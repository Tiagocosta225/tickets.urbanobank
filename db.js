// src/database.js
const { Pool } = require('pg');

// Configurações da conexão (substitua com seus dados)
const pool = new Pool({
  user: 'joe',       // ex: 'postgres'
  host: 'localhost',         // ou IP do servidor PostgreSQL
  database: 'ticket_system', // ex: 'ticketsystem'
  password: 'Joe@154430',     // senha do PostgreSQL
  port: 5432,                // porta padrão do PostgreSQL
});

// Teste a conexão
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Erro ao conectar ao PostgreSQL:', err);
  } else {
    console.log('Conexão bem-sucedida! Hora atual do BD:', res.rows[0].now);
  }
});

module.exports = pool;