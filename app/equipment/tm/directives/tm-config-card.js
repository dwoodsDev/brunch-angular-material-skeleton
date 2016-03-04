var jaguarConfigPortal = angular.module('jaguarConfigPortal');

jaguarConfigPortal.directive('tmConfigCard', function () {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'partials/cards/tm.html'
  };
});
