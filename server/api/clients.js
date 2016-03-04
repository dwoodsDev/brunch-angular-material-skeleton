var Client = require('../models/client'),
  Clients;

Clients = {
  get: function (req, res, next) {
    Client.find(function(err, clients) {
      if (err) {
        return next(err);
      }

      res.json(clients);
    });
  }
};

module.exports = Clients;
