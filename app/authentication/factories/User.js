angular.module('myModule').factory('User', function ($rootScope) {
  var user = {
    authorized: false,
    displayName: 'Log in',
    loginButtonValue: 'Log in',
    name: null,
    error: null
  };

  return {
    get: function () {
      return user;
    },

    set: function (newUser) {
      user = newUser;
    },

    reset: function () {
      user.authorized = false;
      user.name = null;
      user.password = null;
      user.displayName = 'Log in';
      user.loginButtonValue = 'Log in';
      this.notify('changed:user');
    },

    getAuthorized: function () {
      return user.authorized;
    },

    setAuthorized: function (authorized) {
      user.authorized = authorized;
    },

    getDisplayName: function () {
      return user.displayName;
    },

    setDisplayName: function (displayName) {
      user.displayName = displayName;
    },

    getLoginButtonValue: function () {
      return user.loginButtonValue;
    },

    setLoginButtonValue: function (loginButtonValue) {
      user.loginButtonValue = loginButtonValue;
    },

    getName: function () {
      return user.name;
    },

    setName: function (name) {
      user.name = name;
    },

    getError: function () {
      return user.error;
    },

    setError: function (error) {
      user.error = error;
    },

    subscribe: function(property, callback) {
      var handler = $rootScope.$on('changed:' + property, callback);
      $rootScope.$on('$destroy', handler);
    },

    notify: function(property) {
      $rootScope.$emit('changed:' + property);
    }
  };
});
