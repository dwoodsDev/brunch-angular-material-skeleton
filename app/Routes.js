var jaguarConfigPortal = angular.module('jaguarConfigPortal');

jaguarConfigPortal.config(function ($urlRouterProvider, $stateProvider, $locationProvider, $mdThemingProvider) {
  // Generated from the Angular Material Color Generator at angular-md-color.com
  // Primary = #40b4e5      Gogo Blue from Gogo BA secondary palette
  // Accent = #0a2336       Gogo Dark Blue from Gogo BA secondary palette
  // Warn = #e80029         Gogo Red from Gogo BA primary palette
  // Background = #d2d2d2   Gogo Light Gray from Gogo BA primary palette
  var customPrimary = {
    '50': '#b0e0f4',
    '100': '#9ad7f1',
    '200': '#83ceee',
    '300': '#6dc6eb',
    '400': '#56bde8',
    '500': '#40b4e5',
    '600': '#2aabe2',
    '700': '#1d9ed5',
    '800': '#1a8ebf',
    '900': '#177da8',
    'A100': '#c7e9f7',
    'A200': '#ddf2fa',
    'A400': '#f4fbfd',
    'A700': '#146c92'
  };
  $mdThemingProvider.definePalette('customPrimary', customPrimary);

  var customAccent = {
    '50': '#1e69a2',
    '100': '#1a5b8c',
    '200': '#164d77',
    '300': '#123f61',
    '400': '#0e314b',
    '500': '#0a2336',
    '600': '#061520',
    '700': '#02070b',
    '800': '#000000',
    '900': '#000000',
    'A100': '#2277b7',
    'A200': '#2685cd',
    'A400': '#3391d9',
    'A700': '#000000'
  };
  $mdThemingProvider.definePalette('customAccent', customAccent);

  var customWarn = {
    '50': '#ff6883',
    //'100': '#ff4f6e',
    '100': '#2685cd',
    '200': '#ff3559',
    '300': '#ff1c44',
    '400': '#ff022f',
    '500': '#e80029',
    '600': '#ce0024',
    '700': '#b50020',
    '800': '#9b001b',
    '900': '#820017',
    'A100': '#ff8298',
    'A200': '#ff9bad',
    'A400': '#ffb5c2',
    'A700': '#680012'
  };
  $mdThemingProvider.definePalette('customWarn', customWarn);

  var customBackground = {
    '50': '#ffffff',
    '100': '#ffffff',
    '200': '#f8f8f8',
    '300': '#ebebeb',
    '400': '#dfdfdf',
    '500': '#d2d2d2',
    '600': '#c5c5c5',
    '700': '#b8b8b8',
    '800': '#acacac',
    '900': '#9f9f9f',
    'A100': '#ffffff',
    'A200': '#ffffff',
    'A400': '#ffffff',
    'A700': '#929292'
  };
  $mdThemingProvider.definePalette('customBackground', customBackground);

  $mdThemingProvider.theme('default')
      .primaryPalette('customPrimary')
      .accentPalette('customAccent')
      .warnPalette('customWarn')
      .backgroundPalette('customBackground');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl : 'pages/equipment.html',
      controller  : 'EquipmentController'
    })

    .state('equipment', {
      url: '/equipment',
      templateUrl : 'pages/equipment.html',
      controller  : 'EquipmentController'
    })

    .state('bearers', {
      url: '/bearers',
      templateUrl : 'pages/bearers.html',
      controller  : 'BearerController'
    })

    .state('clients', {
      url: '/clients',
      templateUrl : 'pages/clients.html',
      controller  : 'ClientController'
    })

    .state('radios', {
      url: '/radios',
      templateUrl : 'pages/radios.html',
      controller  : 'RadioController'
    })

    .state('flightdata', {
      url: '/flightdata',
      templateUrl : 'pages/flightdata.html',
      controller  : 'FlightDataController'
    });

  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
});
