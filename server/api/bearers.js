var Bearer = require('../models/bearer'),
  Bearers;

Bearers = {
  get: function (req, res, next) {
    Bearer.find(function(err, bearers) {
      if (err) {
        return next(err);
      }

      res.json(bearers);
    });
  }
};

module.exports = Bearers;
