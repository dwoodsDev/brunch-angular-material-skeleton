var db = require('../db'),
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var Client = db.model('Client', {
  _id: String,
  splash: String,
  vid: {
    _id: String,
    description: String,
    name: String
  },
  enabled: Boolean,
  ipaddr: String,
  bearers: [ { _id: String } ],
  zones: [ {
    dns: [ { type: Schema.Types.Mixed }, [ {
      ipaddr: String,
      type: String,
      name: String
    }]],
    name: String
  }],
  netmask: String,
  dhcp_range: String,
  dns: Boolean,
  alt_dns: String,
  dhcp: Boolean,
  aps: [ {
    device: String,
    psk: String,
    hidden: Boolean,
    radio: {
      _id: Number,
      name: String
    },
    ssid: String
  }]
});

module.exports = Client;
