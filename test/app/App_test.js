describe('Module: myModule', function () {
  describe('Configuration', function () {
    var controller, location, scope, state;

    beforeEach(module('myModule'));

    beforeEach(inject(
      function (_$controller_, _$location_, _$rootScope_, _$state_) {
        controller = _$controller_;
        location = _$location_;
        scope = _$rootScope_;
        state = _$state_;
      }
    ));

    afterEach(inject(function($httpBackend) {
      $httpBackend.verifyNoOutstandingRequest();
    }));

     it('redirects to `/` otherwise', function() {
        location.path('/nonExistentPath');
        scope.$emit('$locationChangeSuccess');
        expect(location.path()).to.equal('/');
    });

    describe('Routng States', function () {
      describe('home: `/`', function () {
        var home;

        beforeEach(function () {
          home = state.get('home');
        });

        it('should resolve url to `/`', function () {
          expect(home.url).to.equal('/');
        });
      });
    });

    it('should set $locationProvider to html5Mode', function () {
      expect(location.$$html5).to.be.true;
    });
  });
});
