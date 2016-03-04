var FlightDataController = function ($scope, $window, FlightDataService) {
  FlightDataService.fetch().then(function (flightData) {
    $scope.flightData = flightData;
    $scope.$parent.breadcrumb = 'Flight Data';

    // movingMaps array indices
    $scope.acmsIndex = 0;
    $scope.airTempIndex = 1;
    $scope.altitudeIndex = 2;
    $scope.dateIndex = 3;
    $scope.etaIndex = 4;
    $scope.fusionIndex = 5;
    $scope.gamaIndex = 6;
    $scope.gmtIndex = 7;
    $scope.groundSpeedIndex = 8;
    $scope.latitudeIndex = 9;
    $scope.longitudeIndex = 10;
    $scope.magneticHeadingIndex = 11;
    $scope.mapIndex = 12;
    $scope.origDestIndex = 13;
    $scope.proline21Index = 14;
    $scope.timeToGoIndex = 15;
    $scope.wowIndex = 16;

    $scope.gmtLabels = flightData.movingMaps[$scope.gmtIndex].all_labels.split(',');
    $scope.latitudeLabels = flightData.movingMaps[$scope.latitudeIndex].all_labels.split(',');
    $scope.groundSpeedLabels = flightData.movingMaps[$scope.groundSpeedIndex].all_labels.split(',');
    $scope.airTempLabels = flightData.movingMaps[$scope.airTempIndex].all_labels.split(',');
    $scope.timeToGoLabels = flightData.movingMaps[$scope.timeToGoIndex].all_labels.split(',');
    $scope.longitudeLabels = flightData.movingMaps[$scope.longitudeIndex].all_labels.split(',');
    $scope.magneticHeadingLabels = flightData.movingMaps[$scope.magneticHeadingIndex].all_labels.split(',');
  });

  $scope.confirmFlightDataConfig = function(flightData) {
    var setFlightDataConfigConfirmed = function () {
        $scope.confirmed = true;
        $scope.failed = false;
        $scope.$emit('configChanged');
      },
      setConfigFailed = function () {
        $scope.confirmed = false;
        $scope.failed = true;
      };

    FlightDataService.put(flightData).then(function(response) {
      if (response === true) {
        setFlightDataConfigConfirmed();
      } else {
        setConfigFailed();
        $window.console.error('failed to save Flight Data config');
      }
    }, function (err) {
      setConfigFailed();
      $window.console.error('failed to save Flight Data config', err);
    });
  };
};

angular.module('jaguarConfigPortal').controller('FlightDataController', FlightDataController);
