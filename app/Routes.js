var myModule = angular.module('myModule');

myModule.config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $stateProvider
    .state('route', {
      url: '/',
      templateUrl : 'pages/route.html',
      controller  : 'RouteController'
    })

    .state('404', {
      url: '/404',
      templateUrl: '/404.html'
    });

  $urlRouterProvider.otherwise('/404');
  $locationProvider.html5Mode(true);
});
