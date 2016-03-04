describe('RadioService', function () {
   var radiosModel,
     $rootScope;

  beforeEach(module('jaguarConfigPortal'));

  beforeEach(inject(function (_$rootScope_) {
    radiosModel = {
      data: {
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
      }
    };
    $rootScope = _$rootScope_;
  }));

  afterEach(inject(function($httpBackend) {
    $httpBackend.verifyNoOutstandingRequest();
  }));

  describe('#fetch()', function () {
    it('should $http.get(`/api/radios`)', inject(function($q, $http, RadioService) {
      var deferred = $q.defer(),
        $httpGetStub = sinon.stub($http, 'get'),
        actual;

      $httpGetStub.returns(deferred.promise);

      RadioService.fetch().then(function(radios) {
        actual = radios;
      });

      deferred.resolve(radiosModel);
      $rootScope.$apply();

      sinon.assert.calledWithExactly($httpGetStub, '/api/radios');
      expect(actual).to.be.equal(radiosModel.data);
    }));
  });

  describe('#put()', function () {
    it('should $http.put(`/api/radios`)', inject(function($q, $http, RadioService) {
      var deferred = $q.defer(),
        $httpPut = sinon.stub($http, 'put'),
        response = {
          config: {
            data: radiosModel,
            method: 'PUT'
          },
          data: true,
          status: 200,
          statusText: 'OK'
        },
        actual;

      $httpPut.returns(deferred.promise);

      RadioService.put(radiosModel).then(function(response) {
        actual = response;
      });

      deferred.resolve(response);
      $rootScope.$apply();

      sinon.assert.calledWithExactly($httpPut, '/api/radios', radiosModel);
      expect(actual).to.be.true;
    }));
  });

});
