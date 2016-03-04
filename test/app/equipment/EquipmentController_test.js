describe('EquipmentController', function () {
  var $controller,
    $rootScope;

  beforeEach(module('jaguarConfigPortal'));

  beforeEach(inject(function (_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));

  var createController = function() {
    $rootScope.$parent = {};

    return $controller('EquipmentController', {
      $scope: $rootScope
    });
  };

  it('should set #breadcrumb on the parent scope', function() {
    var parentScope;

    createController();
    parentScope = $rootScope.$parent;
    $rootScope.$apply();

    expect(parentScope.breadcrumb).to.be.equal('Equipment Configuration');
  });
});