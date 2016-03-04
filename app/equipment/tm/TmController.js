var TmController = function ($scope, $window, $mdToast, TmService) {
  TmService.fetch().then(function (tm) {
    $scope.tm = tm;
  });

  $scope.confirmTmConfig = function (tm) {
    TmService.put(tm).then(function (response) {
      if (response.data === 'tm update succeeded') {
        $mdToast.show({
          templateUrl: 'partials/toasts/tm-config-confirmed.html'
        });
      } else {
        $mdToast.show({
          templateUrl: 'partials/toasts/tm-config-error.html'
        });
      }
    });
  };
};

angular.module('jaguarConfigPortal').controller('TmController', TmController);
