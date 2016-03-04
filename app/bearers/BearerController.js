var BearerController = function ($scope, BearerService) {
  BearerService.fetch().then(function (bearers) {
    $scope.bearers = bearers;
    $scope.selected = $scope.bearers[0];
    $scope.$parent.breadcrumb = 'Bearers';
  });
};

angular.module('jaguarConfigPortal').controller('BearerController', BearerController);
