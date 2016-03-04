var mongoose = require('mongoose'),
  _ = require('underscore');

var import_radios = function (dbName, profile, env) {
  var dbURI = 'mongodb://localhost/' + dbName + '',
    radiosData,
    jsonFile = '/etc/jaguar/factory/' + profile + '/radios.json',
    Schema = mongoose.Schema,
    RadioSchema,
    RadioModel;

  if (env === 'local') {
    jsonFile = '../../config/overlay' + jsonFile;
  }

  radiosData = require(jsonFile);

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

  RadioSchema = new Schema({
    _id: Number,
    device: String,
    name: String,
    ssid: String,
    psk: String,
    security_profile: String,
    profiles: [ {
      _id: String,
      band: String,
      enabled: Boolean,
      ap: Boolean,
      channel: Number
    }]
  });

  RadioModel = mongoose.model('Radio', RadioSchema);
  module.export = RadioModel;

  _.each(radiosData, function(radio) {
    var radioModel = new RadioModel(radio);

    radioModel.save(function(err, results) {
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

module.exports = import_radios;
