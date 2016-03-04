var db = require('../db');
var MovingMap = db.model('MovingMap', {
  _id: String,
  origdest: String,
  source: String,
  sources: String,
  all_labels: String,
  active_label: String,
  fixed_labels: String,
  bit: String,
  active_when: String
});

module.exports = MovingMap;
