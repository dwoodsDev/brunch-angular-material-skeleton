var db = require('../db');
var A429 = db.model('A429', {
  _id: String,
  enabled: Boolean,
  label_filter: String,
  parity: String,
  promisc: Boolean,
  speed: String
});

module.exports = A429;
