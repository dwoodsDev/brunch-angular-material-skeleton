var Schema = require('mongoose').Schema,
  PortSchema = new Schema({
  _id: String,
  vid: Number,
  description: String,
  tx: Boolean,
  rx: Boolean,
  mode: {
    type: String,
    enum: ['Access', 'General', 'Mirror']
  },
  equip: new Schema({
    _id: String,
    name: String,
    tooltip: String,
    type: String,
    vid: new Schema({
      _id: String,
      description: String,
      name: String
    })
  })
});

module.exports = PortSchema;
