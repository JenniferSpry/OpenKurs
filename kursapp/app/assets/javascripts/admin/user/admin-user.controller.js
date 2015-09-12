(function() {
  'use strict';

  angular.module('admin.user').controller('AdminUserCtrl', AdminUserEditCtrl);

  function AdminUserEditCtrl($scope, resolveData) {
    
    $scope.users = resolveData;
  }

})();
