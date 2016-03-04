describe('BearerController', function () {
  var BearerServiceMock,
    $rootScope,
    $q,
    $controller,
    BearerService;

  beforeEach(module('jaguarConfigPortal'));

  beforeEach(module(function($provide){
    BearerServiceMock = {};
    $provide.value('BearerService', BearerServiceMock);
  }));

  beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, _BearerService_) {
    $rootScope = _$rootScope_;
    $q = _$q_;
    $controller = _$controller_;
    BearerService = _BearerService_;
  }));

  var createController = function() {
    $rootScope.$parent = {};

    return $controller('BearerController', {
      $scope: $rootScope
    });
  };

  describe('$scope.bearers', function () {
    var fetchDeferred,
      bearersModel = [
        {
          _id: 'bear-company',
          base: true,
          bridged: false,
          enabled: true,
          monitor: {
            interval: 2,
            type: 'None',
          },
          nat: 'Masquerade',
          proto: 'DHCP',
          type: 'Ethernet',
          vid: 809
        }
      ];

    beforeEach(function() {
      fetchDeferred = $q.defer();
      BearerServiceMock.fetch = function() {
        return fetchDeferred.promise;
      };
      createController();
    });

    describe('on success of BearerService #fetch()', function () {
      it('should set #bearers', function() {
        expect($rootScope.bearers).to.be.undefined;

        fetchDeferred.resolve(bearersModel);
        $rootScope.$apply();

        expect($rootScope.bearers).to.be.equal(bearersModel);
      });

      it('should set #selected', function() {
        expect($rootScope.selected).to.be.undefined;

        fetchDeferred.resolve(bearersModel);
        $rootScope.$apply();

        expect($rootScope.selected).to.be.equal(bearersModel[0]);
      });

      it('should set #breadcrumb of parent scope', function() {
        var parentScope = $rootScope.$parent;

        expect(parentScope.breadcrumb).to.be.undefined;

        fetchDeferred.resolve(bearersModel);
        $rootScope.$apply();

        expect(parentScope.breadcrumb).to.equal('Bearers');
      });
    });

    describe('when BearerService #fetch() fails', function () {
      it('should not set #bearers ', function () {
        fetchDeferred.reject();
        $rootScope.$apply();

        expect($rootScope.bearers).to.be.undefined;
      });
    });
  });
});