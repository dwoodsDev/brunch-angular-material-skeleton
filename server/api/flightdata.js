var async = require('async'),
  A429 = require('../models/a429'),
  MovingMap = require('../models/movingmap'),
  Rs232 = require('../models/rs232'),
  WowMon = require('../models/wowmon'),
  LRUConfigUtils = require('../util/LRUConfigUtils'),
  FlightData;

FlightData = {
  get: function (req, res, next) {
    var flightData = {};

    A429.find(function(err, channels) {
      if (err) {
        return next(err);
      }

      flightData.channels = channels;

      MovingMap.find(function(err, movingMaps) {
        if (err) {
          return next(err);
        }

        flightData.movingMaps = movingMaps;

        Rs232.find(function(err, rs232) {
          if (err) {
            return next(err);
          }

          flightData.rs232 = rs232;

          WowMon.find(function(err, wowMon) {
            if (err) {
              return next(err);
            }

            flightData.wowMon = wowMon;

            res.json(flightData);
          });
        });
      }).sort( { _id: 1 } ); // 1 is ascending
    }).sort( { _id: 1 } );

  },

  put: function (req, res) {

    var flightData = req.body,
      channels = flightData.channels,
      movingMaps = flightData.movingMaps,
      rs232 = flightData.rs232[0],
      wowMon = flightData.wowMon[0];

    function saveRx(channelIndex) {
      A429.findOne({_id: channels[channelIndex]._id}, function (err, doc) {
        doc.enabled = channels[channelIndex].enabled;
        doc.speed = channels[channelIndex].speed;
        doc.parity = channels[channelIndex].parity;

        doc.save(function (err) {
          if (err) {
            return next(err);
          }
        });
      });
    }

    function saveMovingMap(movingMapIndex) {
      MovingMap.findOne({_id: movingMaps[movingMapIndex]._id}, function (err, doc) {
        doc.origdest = movingMaps[movingMapIndex].origdest;
        doc.source = movingMaps[movingMapIndex].source;
        doc.sources = movingMaps[movingMapIndex].sources;
        doc.all_labels = movingMaps[movingMapIndex].all_labels;
        doc.active_label = movingMaps[movingMapIndex].active_label;
        doc.fixed_labels = movingMaps[movingMapIndex].fixed_labels;
        doc.active_when = movingMaps[movingMapIndex].active_when;

        if (typeof movingMaps[movingMapIndex].bit === "undefined") {
          doc.bit = movingMaps[movingMapIndex].bit;
        }

        doc.save(function (err) {
          if (err) {
            return next(err);
          }
        });
      });
    }

    var updateRx1 = function(callback) {
      saveRx(0);
      callback(null);
    },
      updateRx2 = function(callback) {
        saveRx(1);
        callback(null);
      },
      updateRx3 = function(callback) {
        saveRx(2);
        callback(null);
      },
      updateRx4 = function(callback) {
        saveRx(3);
        callback(null);
      },
      updateRx5 = function(callback) {
        saveRx(4);
        callback(null);
      },
      updateRx6 = function(callback) {
        saveRx(5);
        callback(null);
      },
      updateRx7 = function(callback) {
        saveRx(6);
        callback(null);
      },
      updateAcms = function(callback) {
        saveMovingMap(0);
        callback(null);
      },
      updateAirTemp = function(callback) {
        saveMovingMap(1);
        callback(null);
      },
      updateAltitude = function(callback) {
        saveMovingMap(2);
        callback(null);
      },
      updateDate = function(callback) {
        saveMovingMap(3);
        callback(null);
      },
      updateEta = function(callback) {
        saveMovingMap(4);
        callback(null);
      },
      updateFusion = function(callback) {
        saveMovingMap(5);
        callback(null);
      },
      updateGama = function(callback) {
        saveMovingMap(6);
        callback(null);
      },
      updateGmt = function(callback) {
        saveMovingMap(7);
        callback(null);
      },
      updateGroundSpeed = function(callback) {
        saveMovingMap(8);
        callback(null);
      },
      updateLatitude = function(callback) {
        saveMovingMap(9);
        callback(null);
      },
      updateLongitude = function(callback) {
        saveMovingMap(10);
        callback(null);
      },
      updateMagneticHeading = function(callback) {
        saveMovingMap(11);
        callback(null);
      },
      updateMap = function(callback) {
        saveMovingMap(12);
        callback(null);
      },
      updateOrigDest = function(callback) {
        saveMovingMap(13);
        callback(null);
      },
      updateProline21 = function(callback) {
        saveMovingMap(14);
        callback(null);
      },
      updateTimeToGo = function(callback) {
        saveMovingMap(15);
        callback(null);
      },
      updateWow = function(callback) {
        saveMovingMap(15);
        callback(null);
      },
      updateRs232 = function(callback) {
        Rs232.findOne({_id: rs232._id}, function (err, doc) {
          doc.baud = rs232.baud;
          doc.bits = rs232.bits;
          doc.parity = rs232.parity;
          doc.stop = rs232.stop;

          doc.save(function (err) {
            if (err) {
              return next(err);
            }
          });
        });
        callback(null);
      },
      updateWowMon = function(callback) {
        WowMon.findOne({_id: wowMon._id}, function (err, doc) {
          doc.source = wowMon.source;
          doc.sources = wowMon.sources;

          doc.save(function (err) {
            if (err) {
              return next(err);
            }
          });
        });
        callback(null);
      };

    async.waterfall([
      updateRx1,
      updateRx2,
      updateRx3,
      updateRx4,
      updateRx5,
      updateRx6,
      updateRx7,
      updateAcms,
      updateAirTemp,
      updateAltitude,
      updateDate,
      updateEta,
      updateFusion,
      updateGama,
      updateGmt,
      updateGroundSpeed,
      updateLatitude,
      updateLongitude,
      updateMagneticHeading,
      updateMap,
      updateOrigDest,
      updateProline21,
      updateTimeToGo,
      updateWow,
      updateRs232,
      updateWowMon
    ], function (err) {
      if (err) {
        console.log(err);
      } else {
        LRUConfigUtils.confirmConfigCollection('flightdata').then(function () {
          res.send(true);
        },
        function () {
          res.send(false);
        });
      }
    });
  }
};

module.exports = FlightData;
