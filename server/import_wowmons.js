var mongoose = require('mongoose'),
  _ = require('underscore');

var import_wowmons = function (dbName, profile, env) {
  var dbURI = 'mongodb://localhost/' + dbName + '',
    wowMonData,
    jsonFile = '/etc/jaguar/factory/' + profile + '/wowmons.json',
    Schema = mongoose.Schema,
    wowMonSchema,
    WowMonModel;

  if (env === 'local') {
    jsonFile = '../../config/overlay' + jsonFile;
  }

  wowMonData = require(jsonFile);

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

  wowMonSchema = new Schema({
    _id: String,
    source: String,
    sources: String
  });

  WowMonModel = mongoose.model('WowMon', wowMonSchema);
  module.export = WowMonModel;

  _.each(wowMonData, function(wowMon) {
    var wowMonModel = new WowMonModel(wowMon);

    wowMonModel.save(function(err, results) {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        console.log(results);
      }
    });
  });

  setTimeout(function() {
    process.exit(0);
  }, 2000);

};

module.exports = import_wowmons;
