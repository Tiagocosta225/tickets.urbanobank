
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// src/controllers/ticketController.js
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


exports.getAllTickets = (req, res) => {
  try {
    // Sua lógica aqui
    res.status(200).json({ message: "Lista de tickets" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTicketById = (req, res) => {
  try {
    // Sua lógica aqui
    res.status(200).json({ message: "Lista de tickets por Id" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTicket = (req, res) => {
  try {
    // Sua lógica aqui
    res.status(200).json({ message: "Update de ticket" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.deleteTicket = (req, res) => {
  try {
    // Sua lógica aqui
    res.status(200).json({ message: "Delete ticket" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.addComment = (req, res) => {
  try {
    // Sua lógica aqui
    res.status(200).json({ message: "Comentário adicionado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

