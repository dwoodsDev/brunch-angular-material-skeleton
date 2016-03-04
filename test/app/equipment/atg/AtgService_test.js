describe('AtgService', function () {
   var atgModel,
    $rootScope;

  beforeEach(module('jaguarConfigPortal'));

  beforeEach(inject(function (_$rootScope_) {
    atgModel = {
      _id: 'bear-gogo',
      base: false,
      bridged: true,
      dns: '192.168.1.15',
      enabled: true,
      gateway: '192.168.1.15',
      ipaddr: '192.168.1.61',
      monitor: {
        interval: 2,
        type: 'None'
        },
        nat: 'One-to-One',
        netmask: '255.255.255.0',
        port: {
          _id: 'eth-2',
          description: 'ATG',
          equip: {
            name: 'ATG',
            type: 'Bearer',
            vid: {
              _id: 101,
              description: 'Gogo Equipment (ACM, ATG, 4300)',
              name: 'Gogo'
            }
          },
          mode: 'Access',
          rx: false,
          tx: false
        },
        proto: 'Static',
        type: 'Ethernet',
        vid: {
          _id: 101,
          name: 'Gogo'
      }
    },
    $rootScope = _$rootScope_;
  }));

  afterEach(inject(function($httpBackend) {
    $httpBackend.verifyNoOutstandingRequest();
  }));

  describe('#fetch()', function () {
    it('should $http.get(`/api/atg`)', inject(function($q, $http, AtgService) {
      var deferred = $q.defer(),
        $httpGetStub = sinon.stub($http, 'get'),
        actual;

      $httpGetStub.returns(deferred.promise);

      AtgService.fetch().then(function(atg) {
        actual = atg;
      });

      deferred.resolve(atgModel);
      $rootScope.$apply();

      sinon.assert.calledWithExactly($httpGetStub, '/api/atg');
      expect(actual).to.be.equal(atgModel.data);
    }));
  });

  describe('#put()', function () {
    it('should $http.put(`/api/atg`)', inject(function($q, $http, AtgService) {
      var deferred = $q.defer(),
        $httpPut = sinon.stub($http, 'put'),
        response = {
          config: {
            data: atgModel,
            method: 'PUT'
          },
          data: true,
          status: 200,
          statusText: 'OK'
        },
        actual;

      $httpPut.returns(deferred.promise);

      AtgService.put(atgModel).then(function(response) {
        actual = response;
      });

      deferred.resolve(response);
      $rootScope.$apply();

      sinon.assert.calledWithExactly($httpPut, '/api/atg', atgModel);
      expect(actual.config).to.be.eql(response.config);
      expect(actual.data).to.be.equal(true);
      expect(actual.status).to.be.equal(200);
      expect(actual.statusText).to.be.equal('OK');
    }));
  });
});
