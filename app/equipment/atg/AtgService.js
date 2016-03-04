var jaguarConfigPortal = angular.module('jaguarConfigPortal');

jaguarConfigPortal.service('AtgService', function ($http) {
  this.fetch = function () {
    return $http.get('/api/atg')
      .then(function (response) {
        return response.data;
      }, function () {
        throw 'failed to GET /api/atg';
      });
  };

  this.put = function (atg) {
    return $http.put('/api/atg', atg)
      .then(function (response) {
        return response;
      }, function () {
        throw 'failed to PUT /api/atg';
      });
  };
});
