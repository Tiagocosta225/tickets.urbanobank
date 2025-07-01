// src/routes/users.js
const express = require('express');
const router = express.Router(); // ← Use o Router do Express, não do pacote 'router'
const { getAllUsers } = require('../controllers/userController');

// Adicione esta linha para importar o controller:
const userController = require('../controllers/userController'); // Caminho correto

// Verificação
console.log('userController importado?', userController !== undefined);

// Verificação final
console.log('Tipo no momento do uso:', typeof getAllUsers);

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.put('/', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;