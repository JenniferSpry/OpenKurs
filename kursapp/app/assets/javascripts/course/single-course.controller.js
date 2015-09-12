(function() {
  'use strict';

  angular.module('course').controller('SingleCourseCtrl', SingleCourseCtrl);

  function SingleCourseCtrl($scope, $document, $rootScope, $state, $templateCache, Auth, CoursepartHttpService, resolveData, partData, _) {

    $document.scrollTopAnimated(0);

    // scope functions
    $scope.goToPart = goToPart;
    $scope.hideMenu = hideMenu;
    $scope.showMenu = showMenu;
    

    $scope.course = resolveData;
    $scope.nextPart;
    $scope.userLoggedIn = Auth.isAuthenticated();

    var part = partData;
    $scope.currentPartId = part.id;
    $scope.currentPartTitle = part.title;

    //find out which part would be next (for the next-button)
    var searchOrder = 100000;
    for (var i = 0; i < $scope.course.courseparts.length; i++) {
      if (($scope.course.courseparts[i].order > part.order) && ($scope.course.courseparts[i].order < searchOrder)) {
        $scope.nextPart = $scope.course.courseparts[i];
        searchOrder = $scope.course.courseparts[i].order;
      }
    };

    //set current part as done by user if user in logged in
    if (!part.doneByUser && Auth.isAuthenticated()) {
      CoursepartHttpService.setCoursepartDone(part.id).then(
        function(response) {
          _.findWhere($scope.course.courseparts, {id: part.id}).doneByUser = true;
        }
      );
    }

    $templateCache.put('coursepart' + part.id + '.html', part.template);
    $scope.currentTemplate = 'coursepart' + part.id + '.html';
    
    function goToPart(part) {
      $state.go('kursteil', {id: $scope.course.id, partId: part.id});
    };

    function showMenu() {
      $rootScope.menuVisible = true;
    };

    function hideMenu() {
      $rootScope.menuVisible = false;
    };
  }

})();
