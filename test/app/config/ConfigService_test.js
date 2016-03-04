describe('ConfigService', function () {
  var $rootScope;

  beforeEach(module('jaguarConfigPortal'));

  beforeEach(inject(function (_$rootScope_) {
    $rootScope = _$rootScope_;
  }));

  afterEach(inject(function($httpBackend) {
    $httpBackend.verifyNoOutstandingRequest();
  }));

  describe('put()', function () {
    it('should PUT to `/api/config/command/<cmd>`', inject(function($q, $http, ConfigService) {
      var putStub = sinon.stub($http, 'put'),
        deferred = $q.defer(),
        cmd = 'save',
        response ='success',
        actual;

      putStub.returns(deferred.promise);

      ConfigService.put(cmd).then(function(response) {
        actual = response;
      });

      sinon.assert.calledWithExactly(putStub, '/api/config/command/' + cmd);

      deferred.resolve(response);
      $rootScope.$apply();

      expect(actual).to.be.equal(response);
    }));
  });
});
