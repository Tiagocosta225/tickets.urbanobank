const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const commentController = require('../controllers/commentController'); // Importação adicionada
const authMiddleware = require('../middlewares/auth');

// Todas as rotas exigem autenticação
router.use(authMiddleware);

// Rotas de tickets
router.get('/', ticketController.getAllTickets);
router.post('/', ticketController.createTicket);
router.get('/:id', ticketController.getTicketById);
router.put('/:id', ticketController.updateTicket);
router.delete('/:id', ticketController.deleteTicket);

// Rotas de comentários
router.get('/:id/comments', commentController.getComments);
router.post('/:id/comments', commentController.addComment);
router.put('/:ticketId/comments/:commentId', authMiddleware, commentController.updateComment);

module.exports = router;