let extension_manager = angular.module('extension_manager', [])
  .config([
    '$compileProvider',
    function ($compileProvider) {
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
    }
  ]);

function chrome_extension_manager($scope) {
  function extension_list() {
    chrome.management.getAll(function (extensions) {
      $scope.$apply(function () {
        $scope.extensions = extensions;
      })
    })
  };
  $scope.uninstall = function (extension) {
    chrome.management.uninstall(extension.id, function () {
      $scope.$apply(function () {
        extension_list();
      })
    });
  };
  $scope.switch = function (extension) {
    chrome.management.setEnabled(extension.id, !extension.enabled, function () {
      $scope.$apply(function () {
        extension.enabled = !extension.enabled;
      })
    });
  };
  extension_list();
  document.getElementById('extension_list').focus();
}
