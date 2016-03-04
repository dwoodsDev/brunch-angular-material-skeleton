var jaguarConfigPortal = angular.module('jaguarConfigPortal');

jaguarConfigPortal.directive('atgConfigCard', function () {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'partials/cards/atg.html',
    controller: 'AtgController',
    controllerAs: 'atg'
  };
});
