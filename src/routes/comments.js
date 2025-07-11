const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Verificação de debug
console.log('addComment é função?', typeof commentController.addComment === 'function');

router.post('/tickets/:ticketId/comments', commentController.addComment);

module.exports = router;