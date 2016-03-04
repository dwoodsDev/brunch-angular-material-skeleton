var db = require('../db');
var Arinc = db.model('Arinc', {
  _id: String,
  channels: [{
    _id: false,
    name: String,
    enabled: Boolean,
    label_filter: String,
    parity: String,
    promisc: Boolean,
    speed: String
  }],
  words: [{
    _id: false,
    name: String,
    all_labels: String,
    active_label: String,
    bit: String,
    active_when: String
  }],
  origdest: {
    gama: String,
    acms: String,
    proline21: String,
    fusion: String
  },
  map: {
    origdest: String,
    source: String,
    sources: String
  },
  rs232: {
    port: String,
    baud: String,
    bits: Number,
    parity: String,
    stop: Number
  },
  wow: {
    source: String,
    sources: String
  }
}, 'arinc'
);

module.exports = Arinc;
