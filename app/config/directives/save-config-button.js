var jaguarConfigPortal = angular.module('jaguarConfigPortal');

jaguarConfigPortal.directive('saveConfigButton', function () {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'partials/buttons/save-config.html',
    controller: 'ConfigController',
    controllerAs: 'config'
  };
});
