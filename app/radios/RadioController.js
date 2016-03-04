var RadioController = function ($scope, RadioService, $mdToast) {
  RadioService.fetch().then(function (radios) {
    $scope.radios = radios;
    $scope.defaultRadio = 1;
    $scope.$parent.breadcrumb = 'Wifi Radios';

    $scope.a50Channels = {
      42: '5.210 GHz',
      58: '5.290 GHz - DFS',
      106: '5.530 GHz - DFS',
      122: '5.610 GHz - DFS',
      138: '5.690 GHz - DFS - US Only',
      155: '5.775 GHz - US Only'
    };
    $scope.g24Channels = [1, 6, 11];
  });

  $scope.saveRadios = function(radios) {
    RadioService.put(radios).then(function(response) {
      if (response === 'radios update succeeded') {
        $mdToast.show({
          templateUrl: 'partials/toasts/radios-config-confirmed.html'
        });
      } else {
        $mdToast.show({
          templateUrl: 'partials/toasts/radios-config-error.html'
        });
      }
    });
  };

};

angular.module('jaguarConfigPortal').controller('RadioController', RadioController);
