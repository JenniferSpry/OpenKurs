(function() {
  'use strict';

  angular.module('admin.course').controller('AdminAllCourseEditCtrl', AdminCourseEditCtrl);

  function AdminCourseEditCtrl($scope, CourseHttpService, toaster, resolveData) {

    $scope.courses = resolveData;

    $scope.newCourse = {};

    $scope.createCourse = createCourse;
    $scope.deleteCourse = deleteCourse;
    $scope.moveCourseDown = moveCourseDown;
    $scope.moveCourseUp = moveCourseUp;

    function createCourse() {
      CourseHttpService.createCourse($scope.newCourse).then(
        function(responseData) {
          $scope.courses.push(responseData);
          $scope.newCourse = {};
          $scope.createCourseForm.$setPristine();
        },
        function(response) {
          toaster.error('Kurs konnte nicht gespeichert werden.', response.data.error);
        }
      );
    };

    function deleteCourse(course) {
      var order = course.order;
      CourseHttpService.deleteCourse(course).then(
        function(responseData) {
          $scope.courses = _.filter($scope.courses, function(c) { 
            if (c.order > order) c.order--;
            return c.id !== course.id;
          });
        },
        function(response) {
          toaster.error('Kurs konnte nicht gelöscht werden.', response.data.error);
        }
      );
    };

    function moveCourseDown(course) {
      switchCourses(course, course.order, _.clone(course.order) + 1);
    }

    function moveCourseUp(course) {
      switchCourses(course, course.order, _.clone(course.order) - 1);
    }

    function switchCourses(course, order, newOrder) {
      var othercourse = _.find($scope.courses, function(c) { return c.order === newOrder; });
      course.order = newOrder;
      othercourse.order = order;
      updateCourse(course);
      updateCourse(othercourse);
    }

    function updateCourse(course) {
      CourseHttpService.updateCourse(course).then(
        function(responseData) {
          // do nothing
        },
        function(response) {
          toaster.error('Kurs konnte nicht gespeichert werden.', response.data.error);
        }
      );
    };
    
  }

})();
