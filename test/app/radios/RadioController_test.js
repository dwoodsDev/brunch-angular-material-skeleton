describe('RadioController', function () {
  var RadioServiceMock,
    $rootScope,
    $q,
    $controller,
    RadioService;

  beforeEach(module('jaguarConfigPortal'));

  beforeEach(module(function($provide){
    RadioServiceMock = {};
    $provide.value('RadioService', RadioServiceMock);
  }));

  beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, _RadioService_) {
    $rootScope = _$rootScope_;
    $q = _$q_;
    $controller = _$controller_;
    RadioService = _RadioService_;
  }));

  var createController = function() {
    $rootScope.$parent = {};

    return $controller('RadioController', {
      $scope: $rootScope
    });
  };

  describe('$scope.radios', function () {
    var fetchDeferred,
      radiosModel = [{
        _id: 0,
        device: '',
        name: '',
        profiles: [ {
          name: '',
          band: '',
          enabled: true,
          ap: true,
          channel: 0
        }]
      },
      {
        _id: 1,
        device: '',
        name: '',
        profiles: [ {
          name: '',
          band: '',
          enabled: true,
          ap: true,
          channel: 0
        }]
        }];

    beforeEach(function() {
      fetchDeferred = $q.defer();
      RadioServiceMock.fetch = function() {
        return fetchDeferred.promise;
      };
      createController();
    });

    describe('on success of RadioService #fetch()', function () {
      it('should set #radios', function() {
        expect($rootScope.radios).to.be.undefined;

        fetchDeferred.resolve(radiosModel);
        $rootScope.$apply();

        expect($rootScope.radios).to.equal(radiosModel);
      });

      it('should set #defaultRadio', function() {
        expect($rootScope.defaultRadio).to.be.undefined;

        fetchDeferred.resolve(radiosModel);
        $rootScope.$apply();

        expect($rootScope.defaultRadio).to.equal(1);
      });

      it('should set #breadcrumb on the parent scope', function() {
        var parentScope = $rootScope.$parent;

        expect(parentScope.breadcrumb).to.be.undefined;

        fetchDeferred.resolve(radiosModel);
        $rootScope.$apply();

        expect(parentScope.breadcrumb).to.equal('Wifi Radios');
      });

      it('should set #a50Channels', function() {
        expect($rootScope.a50Channels).to.be.undefined;

        fetchDeferred.resolve(radiosModel);
        $rootScope.$apply();

        var expectedChannels = {
          42: '5.210 GHz',
          58: '5.290 GHz - DFS',
          106: '5.530 GHz - DFS',
          122: '5.610 GHz - DFS',
          138: '5.690 GHz - DFS - US Only',
          155: '5.775 GHz - US Only'
        };

        expect($rootScope.a50Channels).to.eql(expectedChannels);
      });

      it('should set #g24Channels', function() {
        expect($rootScope.g24Channels).to.be.undefined;

        fetchDeferred.resolve(radiosModel);
        $rootScope.$apply();

        var expectedChannels = [1, 6, 11];

        expect($rootScope.g24Channels).to.eql(expectedChannels);
      });
    });

    describe('when RadioService #fetch() fails', function () {
      it('should not set variables on the root scope', function () {
        fetchDeferred.reject();
        $rootScope.$apply();

        expect($rootScope.radios).to.be.undefined;
        expect($rootScope.defaultRadio).to.be.undefined;
        expect($rootScope.a50Channels).to.be.undefined;
        expect($rootScope.g24Channels).to.be.undefined;
      });
    });
  });
});