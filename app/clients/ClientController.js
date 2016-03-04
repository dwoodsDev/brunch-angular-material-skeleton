var ClientController = function ($scope, ClientService) {
  ClientService.fetch().then(function (clients) {
    $scope.clients = clients;
    $scope.selected = $scope.clients[1];
    $scope.$parent.breadcrumb = 'Wifi Networks';
  });
};

angular.module('jaguarConfigPortal').controller('ClientController', ClientController);
