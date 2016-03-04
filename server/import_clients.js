var mongoose = require('mongoose'),
  _ = require('underscore');

var import_clients = function (dbName, profile, env) {
  var dbURI = 'mongodb://localhost/' + dbName + '',
    clients,
    jsonFile = '/etc/jaguar/factory/' + profile + '/clients.json',
    Schema = mongoose.Schema,
    clientSchema,
    ClientModel;

  if (env === 'local') {
    jsonFile = '../../config/overlay/etc/jaguar/factory/' + profile + '/clients.json';
  }

  clients = require(jsonFile);

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

  clientSchema = new Schema({
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

  ClientModel = mongoose.model('Client', clientSchema);
  module.export = ClientModel;

  _.each(clients, function(client) {
    var clientModel = new ClientModel(client);

    clientModel.save(function(err, results) {
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

module.exports = import_clients;
