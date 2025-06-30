import express from 'express';
import { addComment } from '../controllers/commentController.js';

const router = express.Router();

// POST /tickets/:ticketId/comments
router.post('/tickets/:ticketId/comments', addComment);

export default router;