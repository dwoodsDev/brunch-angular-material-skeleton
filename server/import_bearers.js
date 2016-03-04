var mongoose = require('mongoose'),
  _ = require('underscore');

var import_bearers = function (dbName, profile, env) {
  var dbURI = 'mongodb://localhost/' + dbName + '',
    bearers,
    jsonFile = '/etc/jaguar/factory/' + profile + '/bearers.json',
    Schema = mongoose.Schema,
    bearerSchema,
    BearerModel;

  if (env === 'local') {
    jsonFile = '../../config/overlay' + jsonFile;
  }

  bearers = require(jsonFile);

  mongoose.connect(dbURI);

  mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
  });

  mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
  });

  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      console.log('Mongoose disconnected through app termination');
      process.exit(0);
    });
  });

  bearerSchema = new Schema({
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

  BearerModel = mongoose.model('Bearer', bearerSchema);
  module.export = BearerModel;

  _.each(bearers, function(bearer) {
    var bearerModel = new BearerModel(bearer);

    bearerModel.save(function(err, results) {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        console.log('Saved: ', results);
      }
    });
  });

  setTimeout(function() {
    process.exit(0);
  }, 2000);

};

module.exports = import_bearers;
