var mongoose = require('mongoose'),
  _ = require('underscore'),
  PortModel = require('./models/port');

var import_ports = function (dbName, profile, env) {
  var dbURI = 'mongodb://localhost/' + dbName + '',
    jsonFile = '/etc/jaguar/factory/' + profile + '/ports.json',
    ports;

  if (env === 'local') {
    jsonFile = '../../config/overlay' + jsonFile;
  }

  ports = require(jsonFile);

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

  _.each(ports, function(port) {
    var portModel = new PortModel(port);

    portModel.save(function(err, results) {
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

module.exports = import_ports;
