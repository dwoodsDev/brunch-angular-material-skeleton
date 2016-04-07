var RouteController = function ($scope) {
  $scope.$parent.breadcrumb = 'Route Breadcrumb';
};

angular.module('myModule').controller('RouteController', RouteController);
