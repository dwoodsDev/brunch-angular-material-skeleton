var jaguarConfigPortal = angular.module('jaguarConfigPortal');

jaguarConfigPortal.directive('setFocus', function($timeout) {
  return function(scope, element, attrs) {
    scope.$watch(attrs.setFocus,
      function () {
        $timeout(function() {
          element.focus();
        });
      }, true);
  };
});
