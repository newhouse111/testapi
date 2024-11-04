// server.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://testapi-sns1.onrender.com", // Porta padrão do Vite
    methods: ["GET", "POST"],
  },
});

let contador1 = 0;
let contador2 = 0;

io.on('connection', (socket) => {
  console.log('Usuário conectado:', socket.id);

  socket.emit('initialCounters', { contador1, contador2 });

  socket.on('incrementarBotao1', () => {
    contador1 += 1;
    io.emit('contadorAtualizado', { contador1, contador2 });
  });

  socket.on('incrementarBotao2', () => {
    contador2 += 1;
    io.emit('contadorAtualizado', { contador1, contador2 });
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado:', socket.id);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Servidor ouvindo em http://localhost:${PORT}`);
});
