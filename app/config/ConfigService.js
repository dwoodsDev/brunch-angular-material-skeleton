var jaguarConfigPortal = angular.module('jaguarConfigPortal');

jaguarConfigPortal.service('ConfigService', function ($http) {
  this.put = function (cmd) {
    return $http.put('/api/config/command/' + cmd)
      .then(function (response) {
        return response;
      }, function () {
        throw 'failed to POST /api/config';
      });
  };
});
