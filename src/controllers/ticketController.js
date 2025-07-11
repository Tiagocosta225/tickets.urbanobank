const prisma = require('../prisma');

exports.createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: "Título é obrigatório" });
    }

    const newTicket = await prisma.ticket.create({
      data: { title, description }
    });

    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar ticket" });
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: Number(req.params.id) }
    });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const updatedTicket = await prisma.ticket.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    
    const ticket = await prisma.ticket.findUnique({
      where: { id: Number(id) }
    });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket não encontrado" });
    }

    await prisma.ticket.delete({
      where: { id: Number(id) }
    });

    return res.status(200).json({
      message: "Ticket deletado",
      deletedTicket: { 
        id: ticket.id,
        title: ticket.title
      }
    });
  } catch (error) {
    console.error('Erro detalhado:', error);
    return res.status(500).json({ 
      error: "Falha ao deletar ticket",
      details: error.message // Mostra o erro real
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const newComment = await prisma.comment.create({
      data: {
        content,
        ticketId: Number(req.params.id),
        userId: req.userId
      }
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};