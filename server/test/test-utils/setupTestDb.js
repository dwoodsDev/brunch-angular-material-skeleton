'use strict';

var mongoose = require('mongoose'),
  setupDb = require('../../setupDb'),
  setupTestDb;

setupTestDb = function () {
  var testdbURI = 'mongodb://localhost/test';

  process.env.NODE_ENV = 'test';

  beforeEach(function (done) {
    function clearDB() {
      for (var i in mongoose.connection.collections) {
        mongoose.connection.collections[i].remove(function() {});
      }
      return done();
    }

    if (mongoose.connection.readyState === 0) {
      mongoose.connect(testdbURI, function (err) {
        if (err) {
          throw err;
        }

        clearDB();
        setupDb('test');
      });
    } else {
      clearDB();
      setupDb('test');
    }
  });

  afterEach(function (done) {
   mongoose.disconnect();
   return done();
  });
};

module.exports = setupTestDb;
