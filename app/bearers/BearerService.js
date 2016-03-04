var jaguarConfigPortal = angular.module('jaguarConfigPortal');

jaguarConfigPortal.service('BearerService', function ($http) {
  this.fetch = function () {
    return $http.get('/api/bearers')
      .then(function (response) {
        return response.data;
      }, function () {
        throw 'error';
      });
  };
  this.post = function (bearers) {
    return $http.post('/api/bearers', bearers);
  };
});
