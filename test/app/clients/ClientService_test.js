describe('ClientService', function () {
   var $rootScope;

  beforeEach(module('jaguarConfigPortal'));

  beforeEach(inject(function (_$rootScope_) {
      $rootScope = _$rootScope_;
  }));

  afterEach(inject(function($httpBackend) {
    $httpBackend.verifyNoOutstandingRequest();
  }));

  describe('#fetch()', function () {
    it('should $http.get(`/api/clients`)', inject(function($q, $http, ClientService) {
      var deferred = $q.defer(),
        $httpGetStub = sinon.stub($http, 'get'),
        clientsModel = {
          data: {
            _id: '',
            splash: '',
            id: 0
          }
        },
        actual;

      $httpGetStub.returns(deferred.promise);

      ClientService.fetch().then(function(clients) {
        actual = clients;
      });

      deferred.resolve(clientsModel);
      $rootScope.$apply();

      sinon.assert.calledWithExactly($httpGetStub, '/api/clients');
      expect(actual).to.be.equal(clientsModel.data);
    }));
  });

  describe('#post()', function () {
    it('should $http.post(`/api/clients`)', inject(function($http, ClientService) {
      var $httpPost = sinon.stub($http, 'post'),
        clientsModel = {
            _id: '',
            splash: '',
            id: 0
          };

      ClientService.post(clientsModel);
      sinon.assert.calledWithExactly($httpPost, '/api/clients', clientsModel);
    }));
  });
});
