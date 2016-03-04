describe('Module: jaguarConfigPortal', function () {
  describe('Configuration', function () {
    var controller, location, scope, state;

    beforeEach(module('jaguarConfigPortal'));

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

        it('renders the 404 page', function () {
          expect(home.templateUrl).to.equal('pages/equipment.html');
        });

        it('uses the right controller', function () {
          expect(home.controller).to.equal('EquipmentController');
        });
      });

      describe('equipment', function () {
        var equipment;

        beforeEach(function () {
          equipment = state.get('equipment');
        });

        it('should resolve url to `/equipment`', function () {
          expect(equipment.url).to.equal('/equipment');
        });

        it('renders the 404 page', function () {
          expect(equipment.templateUrl).to.equal('pages/equipment.html');
        });

        it('uses the right controller', function () {
          expect(equipment.controller).to.equal('EquipmentController');
        });
      });

      describe('bearers', function () {
        var bearers;

        beforeEach(function () {
          bearers = state.get('bearers');
        });

        it('should resolve url to `/bearers`', function () {
          expect(bearers.url).to.equal('/bearers');
        });

        it('renders the 404 page', function () {
          expect(bearers.templateUrl).to.equal('pages/bearers.html');
        });

        it('uses the right controller', function () {
          expect(bearers.controller).to.equal('BearerController');
        });
      });

      describe('clients', function () {
        var clients;

        beforeEach(function () {
          clients = state.get('clients');
        });

        it('should resolve url to `/clients`', function () {
          expect(clients.url).to.equal('/clients');
        });

        it('renders the 404 page', function () {
          expect(clients.templateUrl).to.equal('pages/clients.html');
        });

        it('uses the right controller', function () {
          expect(clients.controller).to.equal('ClientController');
        });
      });

      describe('radios', function () {
        var radios;

        beforeEach(function () {
          radios = state.get('radios');
        });

        it('should resolve url to `/radios`', function () {
          expect(radios.url).to.equal('/radios');
        });

        it('renders the 404 page', function () {
          expect(radios.templateUrl).to.equal('pages/radios.html');
        });

        it('uses the right controller', function () {
          expect(radios.controller).to.equal('RadioController');
        });
      });

      describe('flightdata', function () {
        var flightData;

        beforeEach(function () {
          flightData = state.get('flightdata');
        });

        it('should resolve url to `/flightdata`', function () {
          expect(flightData.url).to.equal('/flightdata');
        });

        it('renders the 404 page', function () {
          expect(flightData.templateUrl).to.equal('pages/flightdata.html');
        });

        it('uses the right controller', function () {
          expect(flightData.controller).to.equal('FlightDataController');
        });
      });
    });

    it('should set $locationProvider to html5Mode', function () {
      expect(location.$$html5).to.be.true;
    });
  });
});
