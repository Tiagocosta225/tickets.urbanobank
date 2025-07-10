const express = require('express');
const app = express();
const usersRouter = require('./routes/users');
const ticketsRouter = require('./routes/tickets');
const authRouter = require('./routes/auth');

app.use(express.json());
app.use('/users', usersRouter);
app.use('/tickets', ticketsRouter);
app.use('/auth', authRouter);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});