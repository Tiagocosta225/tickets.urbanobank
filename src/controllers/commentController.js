import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Adicionar comentário a um chamado
export const addComment = async (req, res) => {
  const { ticketId } = req.params;
  const { content, userId } = req.body;

  try {
    // Verifica se o ticket existe
    const ticket = await prisma.ticket.findUnique({
      where: { id: Number(ticketId) },
    });

    if (!ticket) {
      return res.status(404).json({ error: 'Chamado não encontrado' });
    }

    // Cria o comentário
    const comment = await prisma.comment.create({
      data: {
        content,
        ticketId: Number(ticketId),
        userId: Number(userId),
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar comentário' });
  }
};