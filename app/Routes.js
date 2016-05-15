var myModule = angular.module('myModule');

myModule.config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $stateProvider
    .state('route', {
      url: '/',
      templateUrl : 'pages/route.html',
      controller  : 'RouteController'
    })

    .state('notFound', {
      url: '^*path',
      templateUrl: '404.html'
    });

  $locationProvider.html5Mode(true);
});
