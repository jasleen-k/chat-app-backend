const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/messages');
const socket = require('socket.io');
require('dotenv').config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('DB connection success');
  })
  .catch((err) => {
    console.log('Database connection failed');
    console.log(err);
  });

const server = app.listen(PORT, () =>
  console.log(`Server is listening on Port ${PORT}`)
);

const io = socket(server, {
  cors: {
    origin: process.env.ORIGIN,
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on('send-msg', (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-recieved', data.message);
    }
  });
});
