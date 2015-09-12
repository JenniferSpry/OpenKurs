(function() {
  'use strict';

  angular.module('nav').controller('StartCtrl', StartCtrl);

  function StartCtrl($scope, Auth, UserHttpService) {

    $scope.signedIn = Auth.isAuthenticated;

    Auth.currentUser().then(function(user) {
      $scope.user = user;
      UserHttpService.getUserDonePercent(user.id).then(function(responseData) {
        $scope.percent = responseData.percent;
      })
    });

  };
  
})();
