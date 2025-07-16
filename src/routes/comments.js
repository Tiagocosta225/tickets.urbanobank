const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/auth');

// Verificação de debug
console.log('addComment é função?', typeof commentController.addComment === 'function');

router.post('/tickets/:ticketId/comments', commentController.addComment);
router.get('ticketId/comments', commentController.getComments);



module.exports = router;