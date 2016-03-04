(function (global, gogo, _, _define, require, $) {
  "use strict";

  var define = global.define = _.extend(function (name, callback) {
    _define(name, callback);
    define.__DEF_QUEUE__[name] = callback;
  }, {
    __DEF_QUEUE__: {}
  });

  global.gogo = _.extend(gogo || {}, {
    define: define,

    require: _.extend(require, {
      all: function (callback) {
        $(global).ready(function () {
          var _deps = _.map(define.__DEF_QUEUE__, function (ignored, name) {
            return name;
          }), _callback = function () {
            var deps = _.toArray(arguments),
              localRequire = function (dep) {
                return deps[_.indexOf(_deps, dep)];
              };
            return _.isFunction(callback) && callback(localRequire);
          };

          require.apply(null, [ _deps, _callback ]);
        });
      }
    })
  });
})(this, this.gogo, this._, this.define, this.require, this.jQuery);
