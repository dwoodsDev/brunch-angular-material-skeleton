var db = require('../db');
var Bearer = db.model('Bearer', {
  _id: String,
  dns: String,
  nat: String,
  vid: {
    _id: Number,
    name: String,
    bootproto: String,
    ipaddr: String,
    netmask: String,
    description: String
  },
  apn: String,
  proto: String,
  ipaddr: String,
  enabled: Boolean,
  netmask: String,
  base: Boolean,
  bridged: Boolean,
  ssid: String,
  psk: String,
  radio_id: Number,
  type: {type: String},
  gateway: String,
  monitor: {
    interval: Number,
    snmp: String,
    snmp_server: String,
    snmp_target: String,
    snmp_valid: String,
    type: {type: String}
  }
});

module.exports = Bearer;
