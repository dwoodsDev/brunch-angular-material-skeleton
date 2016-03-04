var async = require('async'),
  Bearer = require('../models/bearer'),
  Port = require('../models/port'),
  Equipment = require('../models/equipment'),
  LRUConfigUtils = require('../util/LRUConfigUtils'),
  Atg;

Atg = (function() {
  var atgModel = {
    enabled: false,
    description: 'ATG',
    ipaddr: null,
    name: null,
    originalPort: null,
    port: null
  };

  function getIpaddr(callback) {
    return Bearer.findOne({_id: 'bear-gogo'}, function (err, bearer) {
      if (err) {
        return console.error(err);
      }

      atgModel.ipaddr = bearer._doc.ipaddr;
      callback(null);
    });
  }

  function getName(callback) {
    Equipment.findOne({_id: 'bear-atg'}, function (err, equipment) {
      if (err) {
        return console.error(err);
      }

      atgModel.name = equipment._doc.name;
      callback(null);
    });
  }

  function getPort(callback) {
    Port.findOne({_id: 'eth-2'}, function (err, port) {
      if (err) {
        return console.error(err);
      }

      if(port._doc.equip._id === atgModel.port && atgModel.port !== null) {
        atgModel.enabled = true;
      } else {
        atgModel.enabled = false;
        atgModel.originalPort = port._doc._id;
        atgModel.port = port._doc._id;
      }

      callback(null);
    });
  }

  var api = {
    get: function (req, res, next) {

      async.waterfall([
        getIpaddr,
        getName,
        getPort
      ], function (err) {
        if (err) {
          console.error(err);
          next(err);
        }

        res.json(atgModel);
      });
    },

    put: function (req, res, next) {
      var atg = req.body;

      Port.findOne({_id: 'eth-2'}, function (err, port) {
        if (err) {
          next(err);
        } else {
          if (atg.enabled) {
            port._doc.equip._id = atg.port;
            atgModel.port = atg.port;
          }

          port.save(function (err) {
            if (err) {
              next(err);
            }
          });
        }

        LRUConfigUtils.confirmConfigCollection('ports').then(function () {
            res.send(true);
          },
          function () {
            res.send(false);
          });
      });
    }
  };

  return api;
})();

module.exports = Atg;
