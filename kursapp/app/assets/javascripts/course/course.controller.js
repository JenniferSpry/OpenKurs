(function() {
  'use strict';

  angular.module('course').controller('CourseCtrl', CourseCtrl);

  function CourseCtrl($scope, Auth, resolveData, UserHttpService) {

    $scope.courses = resolveData;
    
    $scope.signedIn = Auth.isAuthenticated;

    Auth.currentUser().then(function(user) {
      $scope.user = user;
      UserHttpService.getUserDonePercent(user.id).then(function(responseData) {
        $scope.percent = responseData.percent;
      })
    });
  }

})();
