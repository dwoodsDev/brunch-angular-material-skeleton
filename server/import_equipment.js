var mongoose = require('mongoose'),
  _ = require('underscore');

var import_equipment = function (dbName, profile, env) {
  var dbURI = 'mongodb://localhost/' + dbName + '',
    equipment,
    jsonFile = '/etc/jaguar/factory/' + profile + '/equipment.json',
    Schema = mongoose.Schema,
    equipmentSchema,
    EquipmentModel;

  if (env === 'local') {
    jsonFile = '../../config/overlay' + jsonFile;
  }

  equipment = require(jsonFile);

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

  equipmentSchema = new Schema({
    _id: String,
    name: String,
    tooltip: String,
    type: String,
    vid: {
      _id: Number,
      description: String,
      name: String
    }
  });

  EquipmentModel = mongoose.model('Equipment', equipmentSchema);
  module.export = EquipmentModel;

  _.each(equipment, function(equipment) {
    var equipmentModel = new EquipmentModel(equipment);

    equipmentModel.save(function(err, results) {
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

module.exports = import_equipment;
