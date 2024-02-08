console.log("consumer connected");
const Kafka = require("node-rdkafka");

const consumer = new Kafka.KafkaConsumer(
  {
    "group.id": "kafka",
    "metadata.broker.list": "localhost:9092",
  },
  {}
);
// Flowing mode
consumer.connect();

consumer
  .on("ready", () => {
    console.log("consumer ready...");
    consumer.subscribe(["heating"]); //subscribe to topics
    consumer.consume();
  })
  .on("data", (data) => {
    console.log(`received message: ${data.value}`);
    console.log(`data: ${data}`);
    return data.value;
  });
