const prisma = require('../prisma');

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