const express = require('express');
const app = express();
const usersRouter = require('./routes/users');
const ticketsRouter = require('./routes/tickets');
const authRouter = require('./routes/auth');
const commentsRouter = require('./routes/comments');

app.use(express.json());
app.use('/users', usersRouter);
app.use('/tickets', ticketsRouter);
app.use('/auth', authRouter);
app.use('/api', commentsRouter);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated');
  });
});