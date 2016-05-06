var userLoginButton = function () {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'partials/buttons/user-login.html',

    controller: 'UserController',
    controllerAs: 'user'
  };
};

angular.module('myModule').directive('userLoginButton', userLoginButton);
