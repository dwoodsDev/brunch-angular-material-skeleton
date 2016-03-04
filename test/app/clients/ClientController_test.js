describe('ClientController', function () {
  var ClientServiceMock,
    $rootScope,
    $q,
    $controller,
    ClientService;

  beforeEach(module('jaguarConfigPortal'));

  beforeEach(module(function($provide){
    ClientServiceMock = {};
    $provide.value('ClientService', ClientServiceMock);
  }));

  beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, _ClientService_) {
    $rootScope = _$rootScope_;
    $q = _$q_;
    $controller = _$controller_;
    ClientService = _ClientService_;
  }));

  var createController = function() {
    $rootScope.$parent = {};

    return $controller('ClientController', {
      $scope: $rootScope
    });
  };

  describe('$scope.clients', function () {
    var fetchDeferred,
      clientsModel = [
        {
          _id: 'foo',
          splash: '',
          id: 0
        },
        {
          _id: 'bar',
          splash: '',
          id: 0
        }
      ];

    beforeEach(function() {
      fetchDeferred = $q.defer();
      ClientServiceMock.fetch = function() {
        return fetchDeferred.promise;
      };
      createController();
    });

    describe('on success of ClientService #fetch()', function () {
      it('should set #clients', function() {
        expect($rootScope.clients).to.be.undefined;

        fetchDeferred.resolve(clientsModel);
        $rootScope.$apply();

        expect($rootScope.clients).to.be.equal(clientsModel);
      });

      it('should set #selected', function() {
        expect($rootScope.selected).to.be.undefined;

        fetchDeferred.resolve(clientsModel);
        $rootScope.$apply();
        expect($rootScope.selected).to.be.equal(clientsModel[1]);
      });

      it('should set #breadcrumb of the parent scope', function() {
        var parentScope = $rootScope.$parent;

        expect(parentScope.breadcrumb).to.be.undefined;

        fetchDeferred.resolve(clientsModel);
        $rootScope.$apply();

        expect(parentScope.breadcrumb).to.equal('Wifi Networks');
      });
    });

    describe('when ClientService #fetch() fails', function () {
      it('should not set #clients', function () {
        fetchDeferred.reject();
        $rootScope.$apply();

        expect($rootScope.clients).to.be.undefined;
        expect($rootScope.selected).to.be.undefined;
      });
    });
  });
});