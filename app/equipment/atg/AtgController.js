var AtgController = function ($scope, $window, AtgService) {
  AtgService.fetch().then(function (atg) {
    $scope.atg = atg;
  });

  $scope.change = function () {
    $scope.confirmed = false;
    $scope.failed = false;
  };

  $scope.confirmAtgConfig = function (atg) {
    var setAtgConfigConfirmed = function () {
        $scope.confirmed = true;
        $scope.failed = false;
        $scope.$emit('configChanged');
      },
      setConfigFailed = function () {
        $scope.confirmed = false;
        $scope.failed = true;
      };

    AtgService.put(atg).then(function (response) {
      if (response.data) {
        setAtgConfigConfirmed();
      } else {
        setConfigFailed();
        $window.console.error('failed to save ATG config');
      }
    }, function (err) {
      setConfigFailed();
      $window.console.error('failed to save ATG config', err);
    });
  };
};

angular.module('jaguarConfigPortal').controller('AtgController', AtgController);
