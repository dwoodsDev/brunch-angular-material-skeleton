var jaguarConfigPortal = angular.module('jaguarConfigPortal');

jaguarConfigPortal.service('FlightDataService', function ($http) {
  this.fetch = function () {
    return $http.get('/api/flightdata')
      .then(function (response) {
        return response.data;
      }, function () {
        throw 'failed to GET /api/flightdata';
      });
  };

  this.put = function(flightData) {
    return $http.put('/api/flightdata', flightData)
      .then(function (response) {
        return response.data;
      }, function () {
        throw 'failed to PUT /api/flightdata';
      });
  };
});
