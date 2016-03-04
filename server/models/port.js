var db = require('../db'),
  PortSchema = require('../schemas/Port'),
  PortModel = db.model('Port', PortSchema);

module.exports = PortModel;
