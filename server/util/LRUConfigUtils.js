var async = require('async'),
  child_process = require('child_process'),
  Q = require('q');

var LRUConfigUtils = {
  _execAsyncCommand: function (cmd) {
    var deferred = Q.defer();

    child_process.exec(cmd, function(error, stdout, stderr) {
      console.log('stdout: ', stdout);
      console.log('stderr: ', stderr);
      if (error !== null) {
        deferred.reject(stderr);
      } else {
        deferred.resolve(stdout);
      }
    });

    return deferred.promise;
  },

  confirmConfigCollection: function (collection) {
    var cmd = '/etc/jaguar/bin/dbexport';

    console.log('Called dbexport for a change in ' + collection);

    return this._execAsyncCommand(cmd);
  },

  activateConfigCollection: function (collection) {
    var cmd = '/etc/jaguar/bin/jag-' + collection  + ' activate';

    return this._execAsyncCommand(cmd);
  },

  saveConfigToLRU: function () {
    var cmd = '/etc/jaguar/bin/jag-system save';

    return this._execAsyncCommand(cmd);
  },

  reboot: function () {
    var cmd = '/usr/local/bin/reboot';

    return this._execAsyncCommand(cmd);
  }
};

module.exports = LRUConfigUtils;
