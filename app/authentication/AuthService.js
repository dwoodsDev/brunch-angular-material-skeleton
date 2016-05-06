var myModule = angular.module('myModule');

myModule.service('AuthService', function ($http, $window, User) {
  this.authenticate = function (user) {
    // implement $http.post to designated authentication api
  };

  this.login = function (newUser) {
    $window.sessionStorage.token = newUser.token;
    $window.sessionStorage.authorized = newUser.authorized;
    $window.sessionStorage.name  = newUser.name;

    User.set(newUser);
    User.setDisplayName(newUser.name);
    User.setLoginButtonValue('Log out');
    User.setError(null);
    User.notify('changed:user');
  };

  this.logout = function () {
    $window.sessionStorage.clear();
    this.resetUserCredentials();
  };

  this.refreshUserCredentials = function () {
    User.setAuthorized($window.sessionStorage.authorized);
    User.setName($window.sessionStorage.name);
    User.setLoginButtonValue('Log out');
    User.notify('changed:user');
  };

  this.resetUserCredentials = function () {
    User.setAuthorized(false);
    User.setName(null);
    User.setDisplayName('Log in');
    User.setLoginButtonValue('Log in');
    User.notify('changed:user');
  };

  this.setUserCredentials = function ($scope) {
    var newUser = User.get();
    $scope.user = newUser;
    $scope.user.displayName = newUser.name || 'Log in';
    $scope.loginButtonValue = newUser.loginButtonValue;
    $scope.user.password = null;
  };

  this.subscribe = function (property, callback) {
    User.subscribe(property, callback);
  };

  this.getUser = function () {
    return User;
  }
});
