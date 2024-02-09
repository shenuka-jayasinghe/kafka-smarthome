console.log('producer...')
const Kafka = require('node-rdkafka');
const { genTemp, timeString } = require('../utils/utils');
const eventType = require('./eventType')


const stream = Kafka.Producer.createWriteStream({
  'metadata.broker.list': 'localhost:9092'
}, {}, {
  topic: 'heating'
});

function queueMessage() {
  // Generate a different message every 3 seconds
  // const message = `Message ${new Date().getTime()}`;
  const temp = genTemp(23);
  const time = timeString(new Date().getTime())
  const message = { temp, time }
  // const queuedSuccess = stream.write(Buffer.from(message));
  const queuedSuccess = stream.write(eventType.toBuffer(message))

  if (queuedSuccess) {
    console.log(`Queued message: ${JSON.stringify(message)}`);
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
