var db = require('../db');
var Rs232 = db.model('Rs232', {
  _id: String,
  device: String,
  baud: String,
  bits: Number,
  parity: String,
  stop: Number
});

module.exports = Rs232;
