var mongoose = require('mongoose'),
  _ = require('underscore');

var import_a429 = function (dbName, profile, env) {
  var dbURI = 'mongodb://localhost/' + dbName + '',
    a429Data,
    jsonFile = '/etc/jaguar/factory/' + profile + '/a429.json',
    Schema = mongoose.Schema,
    a429Schema,
    A429Model;

  if (env === 'local') {
    jsonFile = '../../config/overlay' + jsonFile;
  }

  a429Data = require(jsonFile);

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

  a429Schema = new Schema({
    _id: String,
    enabled: Boolean,
    label_filter: String,
    parity: String,
    promisc: Boolean,
    speed: String
  });

  A429Model = mongoose.model('A429', a429Schema);
  module.export = A429Model;

  _.each(a429Data, function(a429) {
    var a429Model = new A429Model(a429);

    a429Model.save(function(err, results) {
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

module.exports = import_a429;
