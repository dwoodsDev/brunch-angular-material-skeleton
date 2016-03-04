describe('AtgController', function () {
  var $rootScope,
    $q,
    $controller,
    createController,
    AtgService,
    atgModel = {
        _id: '',
        channels: [{
          name: '',
          enabled: true,
          labelFilter: '',
          parity: '',
          promisc: true,
          speed: ''
        }],
        words: [{
          name: '',
          allLabels: '',
          activeLabel: '',
          bit: '',
          activeWhen: ''
        }],
        origdest: {
          gama: '',
          acms: '',
          proline21: '',
          fusion: ''
        },
        map: {
          origdest: '',
          source: ''
        },
        garmin: {
          port: '',
          baud: '',
          bits: 0,
          parity: '',
          stop: 0
        },
        wowSource: ''
      };

  beforeEach(module('jaguarConfigPortal'));

  beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, _AtgService_) {
    $rootScope = _$rootScope_.$new();
    $q = _$q_;
    $controller = _$controller_;
    AtgService = _AtgService_;
  }));

  createController = function() {
    $rootScope.$parent = {};

    return $controller('AtgController', {
      $scope: $rootScope
    });
  };

  describe('$scope.atg', function () {
    var fetchDeferred;

    beforeEach(function() {
      fetchDeferred = $q.defer();
      AtgService.fetch = function() {
        return fetchDeferred.promise;
      };
      createController();
    });

    describe('succeeded', function () {
      it('should set #atg ', function() {
        expect($rootScope.atg).to.be.undefined;

        fetchDeferred.resolve(atgModel);
        $rootScope.$apply();

        expect($rootScope.atg).to.be.equal(atgModel);
      });
    });

    describe('failed', function () {
      it('should not set #atg when AtgService #fetch() fails', function () {
        fetchDeferred.reject();
        $rootScope.$apply();

        expect($rootScope.atg).to.be.undefined;
      });
    });
  });

  describe('change()', function () {
    it('should set #confirmed to false', function () {

    });

    it('should set #failed to false', function () {

    });
  });

  describe('#confirmAtgConfig', function () {
    var putDeferred;

    beforeEach(function () {
      putDeferred = $q.defer();

      sinon.stub(AtgService, 'fetch');
      AtgService.fetch = function() {
        return $q.defer().promise;
      };

      AtgService.put = function() {
        return putDeferred.promise;
      };
      createController();
    });

    describe('on success of #put()', function () {
      it('should setConfigConfirmed on success of #put()', function () {
        var response = {
            config: {
              data: atgModel,
              method: 'PUT'
            },
            data: true,
            status: 200,
            statusText: 'OK'
        },
          emitSpy = sinon.stub($rootScope, '$emit');


        $rootScope.confirmAtgConfig();
        putDeferred.resolve(response);
        $rootScope.$apply();

        sinon.assert.calledWithExactly(emitSpy, 'configChanged');
        expect($rootScope.confirmed).to.be.true;
        expect($rootScope.failed).to.be.false;
      });

      it('should #setConfigFailed when bad response recieved', function () {
        var response = {
            config: {
              data: atgModel,
              method: 'PUT'
            },
            data: null,
            status: 500,
            statusText: 'Internal Server Error'
          };

        $rootScope.confirmAtgConfig();
        putDeferred.resolve(response);
        $rootScope.$apply();

        expect($rootScope.confirmed).to.be.false;
        expect($rootScope.failed).to.be.true;
      });
    });

    describe('on failure of #put()', function () {
      it('should #setConfigFailed', function () {
        $rootScope.confirmAtgConfig();
        putDeferred.reject();
        $rootScope.$apply();

        expect($rootScope.confirmed).to.be.false;
        expect($rootScope.failed).to.be.true;
      });
    });
  });
});
