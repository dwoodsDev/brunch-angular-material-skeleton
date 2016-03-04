var db = require('../db');
var Equipment = db.model('Equipment', {
  _id: String,
  name: String,
  tooltip: String,
  type: String,
  vid: {
    _id: Number,
    description: String,
    name: String
  }
});

module.exports = Equipment;
