(function() {
  'use strict';

  angular.module('admin.course').controller('AdminCoursepartEditCtrl', AdminCoursepartCtrl);

  function AdminCoursepartCtrl($scope, CoursepartHttpService, $stateParams, $rootScope, toaster, resolveData) {

    $scope.updatePart = updatePart;

    $scope.coursepart = resolveData;
    
    $scope.partTitle = angular.copy($scope.coursepart.title);

    function updatePart() {
      CoursepartHttpService.updateCoursepart($scope.coursepart).then(
        function(responseData) {
          toaster.success('Änderungen wurden gespeichert');
          $scope.partTitle = angular.copy($scope.coursepart.title);
        },
        function(responseData) {
          toaster.error('Kursteil konnte nicht gespeichert werden.', responseData.error);
        }
      );
    };

  }

})();
