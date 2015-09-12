(function() {
  'use strict';

  angular.module('admin.course').controller('AdminSingleCourseEditCtrl', AdminSingleCourseCtrl);

  function AdminSingleCourseCtrl($scope, $state, CourseHttpService, CoursepartHttpService, $stateParams, toaster, resolveData) {

    $scope.courseTitle = '';

    $scope.movePartDown = movePartDown;
    $scope.movePartUp = movePartUp;
    $scope.createPart = createPart;
    $scope.deletePart = deletePart;
    $scope.updateCourse = updateCourse;
    
    $scope.course = resolveData;
    $scope.title = resolveData.title;

    data = $scope.course.courseparts;
    $scope.courseTitle = angular.copy($scope.course.title);

    var data = [];
    $scope.newCoursepart = {};

    function movePartDown(part) {
      switchParts(part, part.order, _.clone(part.order) + 1);
    }

    function movePartUp(part) {
      switchParts(part, part.order, _.clone(part.order) - 1);
    }

    function switchParts(part, order, newOrder) {
      var otherPart = _.find($scope.course.courseparts, function(p) { return p.order === newOrder; });
      part.order = newOrder;
      otherPart.order = order;
      updateCoursepart(part);
      updateCoursepart(otherPart);
    }

    function createPart() {
      CoursepartHttpService.createCoursepart($scope.course.id, $scope.newCoursepart).then(
        function(responseData) {
          $scope.course.courseparts.push(responseData);
          $scope.newCoursepart = {};
          $scope.createCoursepartForm.$setPristine();
        },
        function(response) {
          toaster.error('Kursteil konnte nicht gespeichert werden.', response.data.error);
        }
      );
    };

    function updateCoursepart(part) {
      CoursepartHttpService.updateCoursepart(part).then(
        function(responseData) {
          //do nothing
        },
        function(responseData) {
          toaster.error('Kursteil konnte nicht gespeichert werden.', response.error);
        }
      );
    };

    function deletePart(part) {
      var order = part.order;
      CoursepartHttpService.deleteCoursepart(part).then(
        function(responseData) {
          $scope.course.courseparts = _.filter($scope.course.courseparts, function(c) {
            if (c.order > order) c.order--;
            return c.id !== part.id; 
          });
        },
        function(responseData) {
          toaster.error('Kursteil konnte nicht gelöscht werden.', response.error);
        }
      );
    };

    function updateCourse() {
      CourseHttpService.updateCourse($scope.course).then(
        function(responseData) {
          $scope.course = responseData;
          toaster.success('Änderungen wurden gespeichert.');
          $scope.courseTitle = angular.copy($scope.course.title);
        },
        function(response) {
          toaster.error('Kurs konnte nicht gespeichert werden.', response.data.error);
        }
      );
    };
    
  }

})();
