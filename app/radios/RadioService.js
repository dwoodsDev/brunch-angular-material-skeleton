var jaguarConfigPortal = angular.module('jaguarConfigPortal');

jaguarConfigPortal.service('RadioService', function ($http) {
  this.fetch = function () {
    return $http.get('/api/radios')
      .then(function (response) {
        return response.data;
      }, function () {
        throw 'failed to GET /api/radios';
      });
  };
  this.put = function(radios) {
    return $http.put('/api/radios', radios)
      .then(function (response) {
        return response.data;
      }, function () {
        throw 'failed to PUT /api/radios';
      });
  };
});
