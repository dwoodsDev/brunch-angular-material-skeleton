var UserController = function ($rootScope, $scope, $mdDialog, $mdMenu, $window, AuthService) {
  function hideLogin() {
    $mdDialog.hide();
    $mdMenu.hide();
  }

  $scope.submitUser = function (user) {
    if ($window.sessionStorage.token) {
      AuthService.logout();
      hideLogin();
    } else if ($scope.loginForm.$valid) {
      AuthService.authenticate(user).then(function (response) {
        if (response.data.authorized) {
          AuthService.login(response.data);
          hideLogin();
        } else if (response.data.error) {
          $scope.user.error = response.data.error;
        }
      });
    }
  };

  AuthService.subscribe('changed:user', function () {
    AuthService.setUserCredentials($scope);
  });

  if($window.sessionStorage.token) {
    AuthService.refreshUserCredentials();
  } else {
    AuthService.logout();
  }
};

angular.module('myModule').controller('UserController', UserController);
