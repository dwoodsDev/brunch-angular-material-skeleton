var ConfigController = function ($scope, $document, $mdDialog, $mdToast, ConfigService) {
  function showSaveResult(ev, saveStatus) {
    $mdDialog.show({
      templateUrl: 'partials/dialogs/save-config-' + saveStatus + '.html',
      targetEvent: ev,
      clickOutsideToClose: true,
      controller: 'ConfigController',
      controllerAs: 'config'
    });
  }

  $scope.$on('configChanged', function () {
    $mdToast.show({
      controller: 'ConfigController',
      templateUrl: 'partials/toasts/config-not-saved.html',
      autoWrap: true,
      hideDelay: 0,
      position: 'top',
      parent : $document[0].querySelector('#toastBounds')
    });
  });

  $scope.closeToast = function() {
    $mdToast.hide();
  };

  $scope.saveConfig = function (ev) {
    ConfigService.put('save').then(function (response) {
      var saveStatus = response.data;
      $scope.configSaved = saveStatus;
      showSaveResult(ev, saveStatus);
    });
  };

  $scope.restart = function () {
    ConfigService.put('restart');
  };
};

angular.module('jaguarConfigPortal').controller('ConfigController', ConfigController);
