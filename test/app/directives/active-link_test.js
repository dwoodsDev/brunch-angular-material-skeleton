describe('active-link', function () {
  var $compile,
    $location,
    $rootScope;

  beforeEach(module('myModule'));

  beforeEach(inject(function(_$compile_, _$location_, _$rootScope_) {
    $compile = _$compile_;
    $location = _$location_;
    $rootScope = _$rootScope_;
  }));

  it('should set selected .menu-item as .active', function () {
    var element = $compile(
      '<nav class=\"config-menu\" active-link>' +
        '<li class=\"menu-item\">' +
        '  <a ui-sref=\"ports\" href=\"/ports\">Connected Devices</a>' +
        '</li>' +
        '<li class=\"menu-item\">' +
        '  <a ui-sref=\"bearers\" href=\"/bearers\">Bearers</a>' +
        '</li>' +
        '<li class=\"menu-item\">' +
        '  <a ui-sref=\"clients\" href=\"/clients\">Network Clients</a>' +
        '</li>' +
        '<li class=\"menu-item\">' +
        '  <a ui-sref=\"radios\" href=\"/radios\">Wifi Radios</a>' +
        '</li>' +
        '<li class=\"menu-item\">' +
        '  <a ui-sref=\"arinc\" href=\"/arinc\">ARINC 429</a>' +
        '</li>' +
      '</nav>')($rootScope),
      pathStub = sinon.stub($location, 'path');

    expect(element.html()).to.equal(
      '<li class=\"menu-item\">' +
        '  <a ui-sref=\"ports\" href=\"/ports\">Connected Devices</a>' +
        '</li>' +
        '<li class=\"menu-item\">' +
        '  <a ui-sref=\"bearers\" href=\"/bearers\">Bearers</a>' +
        '</li>' +
        '<li class=\"menu-item\">' +
        '  <a ui-sref=\"clients\" href=\"/clients\">Network Clients</a>' +
        '</li>' +
        '<li class=\"menu-item\">' +
        '  <a ui-sref=\"radios\" href=\"/radios\">Wifi Radios</a>' +
        '</li>' +
        '<li class=\"menu-item\">' +
        '  <a ui-sref=\"arinc\" href=\"/arinc\">ARINC 429</a>' +
        '</li>');

    pathStub.returns('/ports');
    $rootScope.$broadcast('$stateChangeSuccess');

    expect(element.html()).to.equal(
      '<li class=\"menu-item active\">' +
        '  <a ui-sref=\"ports\" href=\"/ports\">Connected Devices</a>' +
        '</li>' +
        '<li class=\"menu-item\">' +
        '  <a ui-sref=\"bearers\" href=\"/bearers\">Bearers</a>' +
        '</li>' +
        '<li class=\"menu-item\">' +
        '  <a ui-sref=\"clients\" href=\"/clients\">Network Clients</a>' +
        '</li>' +
        '<li class=\"menu-item\">' +
        '  <a ui-sref=\"radios\" href=\"/radios\">Wifi Radios</a>' +
        '</li>' +
        '<li class=\"menu-item\">' +
        '  <a ui-sref=\"arinc\" href=\"/arinc\">ARINC 429</a>' +
        '</li>');

    pathStub.returns('/arinc');
    $rootScope.$broadcast('$stateChangeSuccess');

    expect(element.html()).to.equal(
      '<li class=\"menu-item\">' +
        '  <a ui-sref=\"ports\" href=\"/ports\">Connected Devices</a>' +
        '</li>' +
        '<li class=\"menu-item\">' +
        '  <a ui-sref=\"bearers\" href=\"/bearers\">Bearers</a>' +
        '</li>' +
        '<li class=\"menu-item\">' +
        '  <a ui-sref=\"clients\" href=\"/clients\">Network Clients</a>' +
        '</li>' +
        '<li class=\"menu-item\">' +
        '  <a ui-sref=\"radios\" href=\"/radios\">Wifi Radios</a>' +
        '</li>' +
        '<li class=\"menu-item active\">' +
        '  <a ui-sref=\"arinc\" href=\"/arinc\">ARINC 429</a>' +
        '</li>');
  });
});
