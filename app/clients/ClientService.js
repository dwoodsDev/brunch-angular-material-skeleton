var jaguarConfigPortal = angular.module('jaguarConfigPortal');

jaguarConfigPortal.service('ClientService', function ($http) {
  this.fetch = function () {
    return $http.get('/api/clients')
      .then(function (response) {
        return response.data;
      }, function () {
        throw 'error';
      });
  };
  this.post = function (clients) {
    return $http.post('/api/clients', clients);
  };
});
