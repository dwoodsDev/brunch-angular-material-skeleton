var LRUConfigUtils = require('../util/LRUConfigUtils'),
  Port = require('../models/port'),
  Ports;

Ports = {
  get: function (req, res, next) {
    Port.find(function(err, ports) {
      if (err) {
        return next(err);
      }

      res.json(ports);
    });
  },

  post: function (req, res, next) {
    var port = new Port({
      _id: req.body._id,
      description: req.body.description
    });

    port.save(function (err, port) {
      if (err) {
        return next(err);
      }

      LRUConfigUtils.confirmConfigCollection('arinc').then(function() {
        res.json(201, port);
      });
    });
  }
};

module.exports = Ports;
