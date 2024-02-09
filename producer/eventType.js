const avro = require('avsc');

module.exports = avro.Type.forSchema({
    type: 'record',
    name: 'Temperature',
    fields: [
      {
        name: 'temp',
        type: 'string'
      },
      {
        name: 'time', 
        type: 'string'
      }
    ]
  });
