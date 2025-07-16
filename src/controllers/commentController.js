const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Adicionar comentário a um chamado
// Usando CommonJS (recomendado para Node.js)
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { ticketId } = req.params;
    
    if (!content) {
      return res.status(400).json({ error: "Conteúdo é obrigatório" });
    }

    const newComment = await prisma.comment.create({
      data: {
        content,
        ticketId: Number(ticketId),
        userId: req.user.id // Assumindo que o auth middleware adiciona isso
      }
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Erro ao criar comentário:', error);
    res.status(500).json({ error: "Erro no servidor" });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { ticketId: Number(req.params.id) },
      include: { user: { select: { name: true } } } // Faltava este fechamento
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar comentários" });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { ticketId, commentId } = req.params;
    const { content } = req.body;

    if (!content) return res.status(400).json({ error: "Conteúdo é obrigatório" });

    const updatedComment = await prisma.comment.update({
      where: { 
        id: Number(commentId),
        ticketId: Number(ticketId),
        userId: req.user.id
      },
      data: { content },
      include: { user: { select: { name: true } } }
    });

    res.json(updatedComment);
  } catch (error) {
    console.error('Erro ao atualizar comentário:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Comentário não encontrado" });
    }
    
    res.status(500).json({ 
      error: "Erro ao atualizar comentário",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};