var mongoose = require('mongoose'),
  _ = require('underscore');

var import_movingmaps = function (dbName, profile, env) {
  var dbURI = 'mongodb://localhost/' + dbName + '',
    movingMapData,
    jsonFile = '/etc/jaguar/factory/' + profile + '/movingmaps.json',
    Schema = mongoose.Schema,
    movingMapSchema,
    MovingMapModel;

  if (env === 'local') {
    jsonFile = '../../config/overlay' + jsonFile;
  }

  movingMapData = require(jsonFile);

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

  movingMapSchema = new Schema({
    _id: String,
    origdest: String,
    source: String,
    sources: String,
    all_labels: String,
    active_label: String,
    fixed_labels: String,
    bit: String,
    active_when: String
  });

  MovingMapModel = mongoose.model('MovingMap', movingMapSchema);
  module.export = MovingMapModel;

  _.each(movingMapData, function(movingMap) {
    var movingMapModel = new MovingMapModel(movingMap);

    movingMapModel.save(function(err, results) {
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

module.exports = import_movingmaps;
