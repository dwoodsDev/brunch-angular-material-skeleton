var AppCtrl = function ($route, $scope, $timeout, $mdSidenav) {
  var debounce = function (func, wait) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    },
    buildDelayedToggler = function(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle();
      }, 200);
    };

  $scope.openMenu = buildDelayedToggler('menu');

  $scope.closeMenu = function () {
    $mdSidenav('menu').close();
  };
};

angular.module('jaguarConfigPortal').controller('AppCtrl', AppCtrl);
