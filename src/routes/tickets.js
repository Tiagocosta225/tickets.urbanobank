const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const authMiddleware = require('../middlewares/auth');

// Todas as rotas exigem autenticação
router.use(authMiddleware);

router.get('/', ticketController.getAllTickets);
router.post('/', authMiddleware, ticketController.createTicket);
router.get('/:id', ticketController.getTicketById);
router.put('/:id', ticketController.updateTicket);
router.delete('/:id', authMiddleware, ticketController.deleteTicket);
router.post('/:id/comments', ticketController.addComment);

module.exports = router;