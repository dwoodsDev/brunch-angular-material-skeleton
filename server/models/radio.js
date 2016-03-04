var db = require('../db');
var Radio = db.model('Radio', {
  _id: Number,
  device: String,
  name: String,
  ssid: String,
  psk: String,
  security_profile: String,
  profiles: [ {
    _id: String,
    ap: Boolean,
    band: String,
    channel: Number,
    enabled: Boolean
  }]
});
module.exports = Radio;
