(function() {
  'use strict';

  angular.module('authmodule').controller('AuthCtrl', AuthCtrl);

  function AuthCtrl($scope, $state, Auth, toaster) {

    $scope.pageTitle = 'foo';
    
    $scope.login = function() {
      Auth.login($scope.user).then(function(user) {
        if (user.admin) {
          $state.go('admin.kurse');
        } else {
          $state.go('start');
        }
        
      }, function(response) {
        toaster.error('Anmelden fehlgeschlagen', response.data.error);
      });
    };

    $scope.register = function() {
      Auth.register($scope.user).then(function() {
        $state.go('start');
      }, function() {
        toaster.error('Registrierung fehlgeschlagen');
      });
    };
  };
  
})();
