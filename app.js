const express = require('express');
const app = express();
const server = require('http').createServer(app);
const WebSocket = require('ws');
const cors = require('cors');
const PORT = 8082;
app.use(cors());
const wss = new WebSocket.Server({ server });

const messages = ["Message 1", "Message 2", "Message 3", "Message 4"];

function sendRandomMessage(ws) {
  const randomIndex = Math.floor(Math.random() * messages.length);
  ws.send(messages[randomIndex]);
}

wss.on('connection', function connection(ws) {
  console.log('a new client connected to server');
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('Welcome client, to WS server');

  // Send a new message every 3 seconds
  const intervalId = setInterval(() => {
    sendRandomMessage(ws);
  }, 3000);

  // Clean up the interval when the client disconnects
  ws.on('close', () => {
    clearInterval(intervalId);
  });
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
