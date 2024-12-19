const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const fs = require('fs');

const path = require('path');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const messagesFilePath = path.join(__dirname, 'messages.json');

const PORT = 3001;

const getMessages = () => {
  if (!fs.existsSync(messagesFilePath)) {
    fs.writeFileSync(messagesFilePath, JSON.stringify([]));
  }
  const messagesData = fs.readFileSync(messagesFilePath);
  return JSON.parse(messagesData);
};

const saveMessage = (message) => {
  const messages = getMessages();
  messages.push(message);
  fs.writeFileSync(messagesFilePath, JSON.stringify(messages));
};

app.use(express.static('public'));

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
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

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});