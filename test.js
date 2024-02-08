const express = require("express");
const Kafka = require("node-rdkafka");

const app = express();
const PORT = 3000;

// Create Kafka consumer
const consumer = new Kafka.KafkaConsumer({
  "group.id": "kafka",
  "metadata.broker.list": "localhost:9092",
});

// Connect consumer
consumer.connect();

// Event listeners for consumer
consumer
  .on("ready", () => {
    console.log("Consumer is ready...");
    consumer.subscribe(["heating"]); // Subscribe to topics
    consumer.consume();
  })
  .on("data", (data) => {
    console.log(`Received message: ${data.value.toString()}`);
    // Handle the message as needed, e.g., store it in a database, emit it to clients, etc.
  })
  .on("error", (err) => {
    console.error("Error from consumer:", err);
  });

// Express route to handle incoming requests
app.get("/consume", (req, res) => {
  // You can put any additional logic here if needed
  res.send("Kafka consumer is running...");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
