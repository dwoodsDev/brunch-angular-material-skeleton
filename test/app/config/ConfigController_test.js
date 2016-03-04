describe('ConfigController', function () {
  var $rootScope,
    $scope,
    $q,
    $document,
    $controller,
    createController,
    ConfigService,
    $mdDialog,
    $mdToast;

  beforeEach(module('jaguarConfigPortal'));

  beforeEach(function () {
    inject(function (_$controller_, _$rootScope_, _$q_, _$document_, _ConfigService_, _$mdDialog_, _$mdToast_) {
      $rootScope = _$rootScope_;
      $q = _$q_;
      $document = _$document_;
      $controller = _$controller_;
      ConfigService = _ConfigService_;
      $mdDialog = _$mdDialog_;
      $mdToast = _$mdToast_;

      createController = function() {
        $rootScope.$parent = {};

        return $controller('ConfigController', {
          $scope: $rootScope
        });
      };
    });
  });

  describe('$on `configChanged`', function () {
    var createController = function () {
      $scope = $rootScope.$new();

      $controller('ConfigController', {$scope: $scope});
    };

    it('should #show `config-not-saved` $mdToast', function () {
      var showSpy = sinon.spy($mdToast, 'show');

      createController();
      $rootScope.$broadcast('configChanged');

      sinon.assert.calledWithExactly(showSpy, {
        autoWrap: true,
        controller: 'ConfigController',
        hideDelay: 0,
        parent: null,
        position: 'top',
        templateUrl: 'partials/toasts/config-not-saved.html'
      });
    });
  });

  describe('$scope.saveConfig()', function () {
    var putStub,
      deferred,
      ev;

    beforeEach(function() {
      putStub = sinon.stub(ConfigService, 'put');
      deferred = $q.defer();
      ev = {};

      sinon.stub($rootScope, '$on');
      createController();

      putStub.returns(deferred.promise);
    });

    it('should #put() `save`', function () {
      $rootScope.saveConfig(ev);

      sinon.assert.calledWithExactly(putStub, 'save');
    });

    it('should #show() save-config-success dialog when save succeeds', function () {
      var showStub = sinon.stub($mdDialog, 'show'),
        showArgs = {
          templateUrl: 'partials/dialogs/save-config-success.html',
          targetEvent: ev,
          clickOutsideToClose: true
        },
        response = {
          data: 'success'
        };

      $rootScope.saveConfig(ev);
      deferred.resolve(response);
      $rootScope.$apply();

      sinon.assert.calledWithExactly(showStub, showArgs);
    });

    it('should #show() save-config-failed dialog when save fails', function () {
      var showStub = sinon.stub($mdDialog, 'show'),
        showArgs = {
          templateUrl: 'partials/dialogs/save-config-failed.html',
          targetEvent: ev,
          clickOutsideToClose: true
        },
        response = {
          data: 'failed'
        };

      $rootScope.saveConfig(ev);
      deferred.resolve(response);
      $rootScope.$apply();

      sinon.assert.calledWithExactly(showStub, showArgs);
    });
  });

  describe('restart()', function () {
    it('should #put() `restart`', function () {
      var putStub = sinon.stub(ConfigService, 'put');

      sinon.stub($rootScope, '$on');
      createController();
      $rootScope.restart();

      sinon.assert.calledWithExactly(putStub, 'restart');
    });
  });
});
