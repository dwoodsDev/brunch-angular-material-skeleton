var db = require('../db');
var WowMon = db.model('WowMon', {
  _id: String,
  source: String,
  sources: String
});

module.exports = WowMon;
