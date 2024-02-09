const express = require('express');
const app = express();
const server = require('http').createServer(app);
const WebSocket = require('ws');
const cors = require('cors');
const PORT = 8082;
app.use(cors());
const wss = new WebSocket.Server({ server });
const Kafka = require("node-rdkafka");

const { timeString } = require('./utils/timeString');

const consumer = new Kafka.KafkaConsumer(
  {
    "group.id": "kafka",
    "metadata.broker.list": "localhost:9092",
  },
  {}
);

consumer.connect();

consumer
  .on("ready", () => {
    console.log("consumer ready...");
    consumer.subscribe(["heating"]); //subscribe to topics
    consumer.consume();
  })
  .on("data", (data) => {
    //ideally send the temperature and time for frontend graph. Need to seriliase with Avro
    const time = timeString(data.timestamp)
    const tempTime = { 
        temp: data.value.toString(),
        time
     }
    console.log(`received message: ${JSON.stringify(tempTime)}`);
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
      client.send(data.value.toString()); // Convert buffer to string before sending
    }
    })
    return data.value;
  });

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
