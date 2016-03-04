describe('BearerService', function () {
   var $rootScope;

  beforeEach(module('jaguarConfigPortal'));

  beforeEach(inject(function (_$rootScope_) {
      $rootScope = _$rootScope_;
  }));

  afterEach(inject(function($httpBackend) {
    $httpBackend.verifyNoOutstandingRequest();
  }));

  describe('#fetch()', function () {
    it('should $http.get(`/api/bearers`)', inject(function($q, $http, BearerService) {
      var deferred = $q.defer(),
        $httpGetStub = sinon.stub($http, 'get'),
        bearersModel = {
          data: {
            _id : '',
            dns: '',
            nat : '',
            vid : 0,
            proto : '',
            ipaddr: '',
            enabled : true,
            netmask: '',
            base : true,
            bridged : true,
            psk: '',
            bearerType : '',
            gateway: '',
            monitor : {
              interval : 0,
              monitorType : ''
            }
          }
        },
        actual;

      $httpGetStub.returns(deferred.promise);

      BearerService.fetch().then(function(bearers) {
        actual = bearers;
      });

      deferred.resolve(bearersModel);
      $rootScope.$apply();

      sinon.assert.calledWithExactly($httpGetStub, '/api/bearers');
      expect(actual).to.be.equal(bearersModel.data);
    }));
  });

  describe('#post()', function () {
    it('should $http.post(`/api/bearers`)', inject(function($http, BearerService) {
      var $httpPost = sinon.stub($http, 'post'),
        bearersModel = {
          _id : '',
          dns: '',
          nat : '',
          vid : 0,
          proto : '',
          ipaddr: '',
          enabled : true,
          netmask: '',
          base : true,
          bridged : true,
          psk: '',
          bearerType : '',
          gateway: '',
          monitor : {
            interval : 0,
            monitorType : ''
          }
        };

      BearerService.post(bearersModel);
      sinon.assert.calledWithExactly($httpPost, '/api/bearers', bearersModel);
    }));
  });
});
