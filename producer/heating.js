console.log('producer...')
const Kafka = require('node-rdkafka');

const stream = Kafka.Producer.createWriteStream({
  'metadata.broker.list': 'localhost:9092'
}, {}, {
  topic: 'heating'
});

function queueMessage() {
  // Generate a different message every 3 seconds
  const message = `Message ${new Date().getTime()}`;
  const queuedSuccess = stream.write(Buffer.from(message));
  if (queuedSuccess) {
    console.log(`Queued message: ${message}`);
  } else {
    console.log('Too many messages in our queue already');
  }
}

// NOTE: MAKE SURE TO LISTEN TO THIS IF YOU WANT THE STREAM TO BE DURABLE
// Otherwise, any error will bubble up as an uncaught exception.
stream.on('error', (err) => {
  console.error('Error in our kafka stream');
  console.error(err);
});

setInterval(() => {
  queueMessage();
}, 3000);
