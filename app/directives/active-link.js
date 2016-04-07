var activeLink = function ($location) {
  return {
    restrict: 'A',
    replace: false,
    link: function (scope, elem) {
      scope.$on('$stateChangeSuccess', function () {
        var hrefs = ['#' + $location.path(), $location.path()];

        angular.forEach(elem.find('a'), function (a) {
          a = angular.element(a);

          if (-1 !== hrefs.indexOf(a.attr('href'))) {
            a.parent().addClass('active');
          } else {
            a.parent().removeClass('active');
          }
        });
      });
    }
  };
};

angular.module('myModule').directive('activeLink', ['$location', activeLink]);
