var async = require('async'),
  Radio = require('../models/radio'),
  Client = require('../models/client'),
  Radios;

Radios = {
  get: function (req, res, next) {
    var radios = [];

    Radio.find(function(err, radiosModel) {
      if (err) {
        return next(err);
      }

      for (var i=0; i<2; i++) {
        radios.push(radiosModel[i]._doc);
      }

      var findClient1 = function(callback) {
        Client.find(function (err, clientsModel) {
          if (err) {
            return next(err);
          }

          for (var i=0; i<clientsModel.length; i++) {
            var client = clientsModel[i]._doc;

            if (client.aps) {
              for (var j=0; j<client.aps.length; j++) {
                var ap = client.aps[j]._doc;
                if (ap.radio._id === radios[0]._id) {
                  radios[0].ssid = ap.ssid;
                  radios[0].psk = ap.psk !== undefined ? ap.psk : '';
                  radios[0].security_profile = radios[0].psk.length > 0 ? 'WPA2' : 'None';
                }
              }
            }
          }

          callback(null);
        });
      },
      findClient2 = function(callback) {
        Client.find(function (err, clientsModel) {
          if (err) {
            return next(err);
          }

          for (var i=0; i<clientsModel.length; i++) {
            var client = clientsModel[i]._doc;

            if (client.aps) {
              for (var j=0; j<client.aps.length; j++) {
                var ap = client.aps[j]._doc;
                if (ap.radio._id === radios[1]._id) {
                  radios[1].ssid = ap.ssid;
                  radios[1].psk = ap.psk !== undefined ? ap.psk : '';
                  radios[1].security_profile = radios[1].psk.length > 0 ? 'WPA2' : 'None';
                }
              }
            }
          }

          callback(null);
        });
      };

      async.waterfall([
        findClient1,
        findClient2
      ], function (err) {
        if (err) {
          console.log(err);
        }

        res.json(radios);
      });

    }).sort({ _id: 1 });
  },

  put: function (req, res) {

    var id1 = req.body[0]._id,
      id2 = req.body[1]._id;

    var saveRadio1 = function(callback) {
      Radio.findOne({ _id: id1 }, function (err, radioDoc) {
        var radio = req.body[0],
          ssid = radio.ssid,
          psk = radio.psk,
          security_profile = radio.security_profile;

        if (err) {
          return next(err);
        } else {
          radioDoc.device = radio.device;
          radioDoc.name = radio.name;

          radioDoc.profiles = [];
          radioDoc.profiles.push(radio.profiles[0]);
          if (radio.profiles[1]) {
            radioDoc.profiles.push(radio.profiles[1]);
          }
        }

        radioDoc.save(function (err) {
          if (err) {
            res.send('radios update failed:' + err);
          }
        });

        Client.find(function(err, clients) {
          if (err) {
            return next(err);
          }
          var matchingClient, matchingIndex;

          for (var i=0; i<clients.length; i++) {
            var client = clients[i];

            for (var j=0; j<2; j++) {
              if (client.aps[j] && radio._id === client.aps[j].radio._id) {
                matchingClient = client;
                matchingIndex = j;
              }
            }
          }

          if (matchingClient !== undefined) {
            Client.findOne({ _id: matchingClient._id }, function(err, clientDoc) {
              if (err) {
                return next(err);
              }
              clientDoc.aps[matchingIndex].ssid = ssid;
              if (security_profile === 'None') {
                psk = '';
              }
              clientDoc.aps[matchingIndex].psk = psk;

              clientDoc.save(function (err) {
                if (err) {
                  res.send('radios update failed:' + err);
                }
              });
            });
          }
        });

        callback(null);
      });
    };

    var saveRadio2 = function(callback) {
      Radio.findOne({ _id: id2 }, function (err, radioDoc) {
        var radio = req.body[1],
          ssid = radio.ssid,
          psk = radio.psk,
          security_profile = radio.security_profile;
        if (err) {
          res.send('radios update failed:' + err);
          return;
        } else {
          radioDoc.device = radio.device;
          radioDoc.name = radio.name;

          radioDoc.profiles = [];
          radioDoc.profiles.push(radio.profiles[0]);
          if (radio.profiles[1]) {
            radioDoc.profiles.push(radio.profiles[1]);
          }
        }

        radioDoc.save(function (err) {
          if (err) {
            res.send('radios update failed:' + err);
          }
        });

        Client.find(function(err, clients) {
          if (err) {
            res.send('client update failed:' + err);
            return;
          }
          var matchingClient, matchingIndex;

          for (var i=0; i<clients.length; i++) {
            var client = clients[i];

            for (var j=0; j<2; j++) {
              if (client.aps[j] && radio._id === client.aps[j].radio._id) {
                matchingClient = client;
                matchingIndex = j;
              }
            }
          }

          if (matchingClient !== undefined) {
            Client.findOne({ _id: matchingClient._id }, function(err, clientDoc) {
              if (err) {
                res.send('client update failed:' + err);
                return;
              }
              clientDoc.aps[matchingIndex].ssid = ssid;
              if (security_profile === 'None') {
                psk = '';
              }
              clientDoc.aps[matchingIndex].psk = psk;

              clientDoc.save(function (err) {
                if (err) {
                  res.send('client update failed:' + err);
                }
              });
            });
          }
        });

        callback(null);
      });
    };

    async.waterfall([
      saveRadio1,
      saveRadio2
    ], function (err) {
      if (err) {
        console.log('Error after saving radios: ' + err)
      } else {
        res.send('radios update succeeded');
      }
    });
  }
};

module.exports = Radios;
