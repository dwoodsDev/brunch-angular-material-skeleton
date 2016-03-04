var Bearer = require('../models/bearer'),
  Tm;

Tm = {
  get: function (req, res, next) {
    var tm = {};

    Bearer.find({ _id: 'bear-tm' }).stream().on('data', function(tmModel, err) {
      if (err) {
        return next(err);
      }

      tm = tmModel._doc;

      res.json(tm);
    });
  },

  put: function (req, res) {
    var tm = req.body,
      id = tm._id;

    Bearer.findOne({ _id: id }, function (err, doc) {

      if (err) {
        console.log('Error ' + err);
      }
      else {
        doc.enabled = tm.enabled;
        doc.apn = tm.apn;

        doc.save(function (err) {
          if (err) {
            return next(err);
          } else {
            res.send('tm update succeeded');
          }
        });
      }
    });
  }
};

module.exports = Tm;
