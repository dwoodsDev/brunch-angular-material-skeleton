var LRUConfigUtils = require('../util/LRUConfigUtils'),
  ArincModel = require('../models/arinc'),
  Arinc;

Arinc = {
  get: function (req, res, next) {
    ArincModel.find(function(err, arinc) {
      if (err) {
        return next(err);
      }

      res.json(arinc);
    });
  },

  put: function(req, res) {
    var id = req.body[0]._id;

    ArincModel.findOne({ _id: id }, function (err, doc) {

      if (err) {
        console.log('Error: ' + err);
      }
      else {
        for (var channel = 0; channel < 9; channel++) {
          doc.channels[channel].name = req.body[0].channels[channel].name;
          doc.channels[channel].enabled = req.body[0].channels[channel].enabled;
          doc.channels[channel].speed = req.body[0].channels[channel].speed;
          doc.channels[channel].parity = req.body[0].channels[channel].parity;
          doc.channels[channel].label_filter = req.body[0].channels[channel].label_filter;

          if (typeof req.body[0].channels[channel].label_filter === "undefined") {
            doc.channels[channel].promisc = false;
          } else {
            doc.channels[channel].promisc = req.body[0].channels[channel].label_filter.length > 0;
          }
        }

        for (var word = 0; word < 10; word++) {
          doc.words[word].name = req.body[0].words[word].name;
          doc.words[word].active_label = req.body[0].words[word].active_label;
          doc.words[word].all_labels = req.body[0].words[word].all_labels;
          if (typeof req.body[0].words[word].bit === "undefined") {
            doc.words[word].bit = req.body[0].words[word].bit;
          }
        }

        doc.wow = {};
        doc.wow.source = req.body[0].wow.source;
        doc.wow.sources = req.body[0].wow.sources;

        doc.rs232 = {};
        doc.rs232.port = req.body[0].rs232.port;
        doc.rs232.baud = req.body[0].rs232.baud;
        doc.rs232.bits = req.body[0].rs232.bits;
        doc.rs232.parity = req.body[0].rs232.parity;
        doc.rs232.stop = req.body[0].rs232.stop;

        doc.origdest = {};
        doc.origdest.gama = req.body[0].origdest.gama;
        doc.origdest.acms = req.body[0].origdest.acms;
        doc.origdest.proline21 = req.body[0].origdest.proline21;
        doc.origdest.fusion = req.body[0].origdest.fusion;

        doc.map = {};
        doc.map.origdest = req.body[0].map.origdest;
        doc.map.source = req.body[0].map.source;
        doc.map.sources = req.body[0].map.sources;

        doc.save(function (err) {
          if (err) {
            return handleError(err);
          } else {
            //TODO: Ensure the proper name for the collection is used. (i.e. fligtData)
            LRUConfigUtils.confirmConfigCollection('arinc').then(function() {
              res.send('flight data config saved');
            });
          }
        });
      }
    });
  }
};

module.exports = Arinc;
