(function() {
  'use strict';

  angular.module('nav').controller('NavCtrl', NavCtrl);

  function NavCtrl($scope, Auth, $state) {

    $scope.signedIn = Auth.isAuthenticated;
    $scope.logout = Auth.logout;

    $scope.$on('$stateChangeSuccess', function() {
      $scope.isCollapsed = true;
    });

    Auth.currentUser().then(function(user) {
      $scope.user = user;
    });

    $scope.$on('devise:new-registration', function(e, user) {
      $scope.user = user;
    });

    $scope.$on('devise:login', function(e, user) {
      $scope.user = user;
    });

    $scope.$on('devise:logout', function(e, user) {
      $scope.user = {};
      $state.reload()
    });

  };
  
})();
