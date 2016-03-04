var mongoose = require('mongoose'),
  _ = require('underscore');

var import_rs232 = function (dbName, profile, env) {
  var dbURI = 'mongodb://localhost/' + dbName + '',
    rs232Data,
    jsonFile = '/etc/jaguar/factory/' + profile + '/rs232.json',
    Schema = mongoose.Schema,
    rs232Schema,
    Rs232Model;

  if (env === 'local') {
    jsonFile = '../../config/overlay' + jsonFile;
  }

  rs232Data = require(jsonFile);

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

  rs232Schema = new Schema({
    _id: String,
    device: String,
    baud: String,
    bits: Number,
    parity: String,
    stop: Number
  });

  Rs232Model = mongoose.model('Rs232', rs232Schema);
  module.export = Rs232Model;

  _.each(rs232Data, function(rs232) {
    var rs232Model = new Rs232Model(rs232);

    rs232Model.save(function(err, results) {
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

module.exports = import_rs232;
