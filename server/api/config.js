var LRUConfigUtils = require('../util/LRUConfigUtils'),
  Config;

Config = {
  save: {
    put: function (req, res) {
      LRUConfigUtils.saveConfigToLRU().then(function () {
          res.send('success');
        },
        function () {
          res.send('failure');
        });
    }
  },

  restart: {
    put: function (req, res) {
      LRUConfigUtils.reboot().then(function () {
          res.send('success');
        },
        function () {
          res.send('failure');
        });
    }
  }
};

module.exports = Config;
