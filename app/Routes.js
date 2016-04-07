var myModule = angular.module('myModule');

myModule.config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $stateProvider
    .state('route', {
      url: '/',
      templateUrl : 'pages/route.html',
      controller  : 'RouteController'
    });

  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
});
