const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: '/ws' });

const messagesFilePath = path.join(__dirname, 'messages.json');

const PORT = process.env.PORT || 3001;

const getMessages = () => {
  if (!fs.existsSync(messagesFilePath)) {
    fs.writeFileSync(messagesFilePath, JSON.stringify([]));
  }
  const messagesData = fs.readFileSync(messagesFilePath, 'utf-8');
  try {
    return JSON.parse(messagesData);
  } catch (err) {
    console.error("Error parsing JSON:", err);
    return [];
  }
};

const saveMessage = (message) => {
  const messages = getMessages();
  messages.push(message);
  fs.writeFileSync(messagesFilePath, JSON.stringify(messages));
};

const deleteOldMessages = () => {
  const messages = getMessages();
  const now = Date.now();
  const newMessages = messages.filter(msg => (now - new Date(msg.timestamp).getTime()) < 30 * 60 * 1000); // 30 minutos en milisegundos
  fs.writeFileSync(messagesFilePath, JSON.stringify(newMessages));
};

app.use(express.static('public'));

wss.on('connection', (ws) => {
  console.log('Cliente conectado');
  
  ws.on('message', (message) => {
    console.log('Mensaje recibido del cliente:', message);
    const msg = JSON.parse(message);
    saveMessage(msg);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(msg));
      }
    });
  });

  ws.send(JSON.stringify({ type: 'init', messages: getMessages() }));
});

// Ejecutar la función para borrar mensajes antiguos cada 10 minutos
setInterval(deleteOldMessages, 10 * 60 * 1000);

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
