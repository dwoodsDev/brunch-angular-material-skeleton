describe('Module: myModule', function () {
  describe('Configuration', function () {
    var $controller, $location, $rootScope, $state;

    beforeEach(module('myModule'));

    beforeEach(inject(
      function (_$controller_, _$location_, _$rootScope_, _$state_) {
        $controller = _$controller_;
        $location = _$location_;
        $rootScope = _$rootScope_;
        $state = _$state_;
      }
    ));

    afterEach(inject(function($httpBackend) {
      $httpBackend.verifyNoOutstandingRequest();
    }));

    describe('route: `/`', function () {
      var route;

      beforeEach(function () {
        route = $state.get('route');
      });

      it('should resolve url to `/`', function () {
        expect(route.url).to.equal('/');
      });

      it('renders the status page', function () {
        expect(route.templateUrl).to.equal('pages/route.html');
      });

      it('uses the right controller', function () {
        expect(route.controller).to.equal('RouteController');
      });
    });

    describe('notFound: `any path not defined in $stateProvider`', function () {
      var notFound;

      beforeEach(function () {
        notFound = $state.get('notFound');
      });

      it('should resolve url to `/`', function () {
        expect(notFound.url).to.equal('^*path');
      });

      it('renders the status page', function () {
        expect(notFound.templateUrl).to.equal('404.html');
      });
    });

    it('should set $locationProvider to html5Mode', function () {
      expect($location.$$html5).to.be.true;
    });
  });
});
