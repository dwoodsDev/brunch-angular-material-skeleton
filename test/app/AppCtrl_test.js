describe('AppCtrl', function () {
  var $location, scope, $timeout, $mdSidenav, AppCtrl;

  beforeEach(module('jaguarConfigPortal', function ($provide) {
    $mdSidenav = {
      close: sinon.stub(),
      toggle: sinon.stub()
    };

    $provide.factory('$mdSidenav', function() {
        return function(element) {
            element;
            return $mdSidenav;
        };
      });
  }));

  beforeEach(inject(
    function (_$controller_, _$location_, $rootScope, _$timeout_) {
      $location = _$location_;
      scope = $rootScope.$new();
      $timeout = _$timeout_;
      AppCtrl = _$controller_('AppCtrl', {
          $scope: scope
      });
    }
  ));

  describe('closeMenu()', function () {
    it('should close() $mdSidenav(`menu`)', function () {
      scope.closeMenu();

      sinon.assert.calledOnce($mdSidenav.close);
    });
  });

  //TODO: figure out how to test openMenu()
});
