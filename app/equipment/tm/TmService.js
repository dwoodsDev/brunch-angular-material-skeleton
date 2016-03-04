var jaguarConfigPortal = angular.module('jaguarConfigPortal');

jaguarConfigPortal.service('TmService', function ($http) {
  this.fetch = function () {
    return $http.get('/api/tm')
      .then(function (response) {
        return response.data;
      }, function () {
        throw 'failed to GET /api/tm';
      });
  };

  this.put = function (tm) {
    return $http.put('/api/tm', tm)
      .then(function (response) {
        return response;
      }, function () {
        throw 'failed to PUT /api/tm';
      });
  };
});
