(function() {
  'use strict';

  angular.module('admin').config(config);

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'admin/_admindash.html',
        controller: 'AdminCtrl',
        abstract: true,
        resolve:{
          authentication:  function(Auth, $state) {
            return Auth.currentUser().then(function(user) {
              if (!user.admin) {  
                $state.go('start');
              }
            }, function() {
              $state.go('start');
            })
          }
        }
      })
      .state('admin.kurse', {
        url: '/kurse',
        controller: 'AdminAllCourseEditCtrl',
        templateUrl: 'admin/course/_all-courses-edit.html',
        resolve: {
          resolveData: function(CourseHttpService) {
            return CourseHttpService.getAllCourses();
          }
        }
      })
      .state('admin.users', {
        url: '/users',
        controller: 'AdminUserCtrl',
        templateUrl: 'admin/user/_all-users.html',
        resolve: {
          resolveData: function(UserHttpService) {
            return UserHttpService.getAllUsers();
          }
        }
      })
      .state('admin.kurs', {
        url: '/kurs/:courseid',
        controller: 'AdminSingleCourseEditCtrl',
        templateUrl: 'admin/course/_single-course-edit.html',
        resolve: {
          resolveData: function(CourseHttpService, $stateParams) {
            return CourseHttpService.getCourse($stateParams.courseid);
          }
        }
      })
      .state('admin.kursteil', {
        url: '/kurs/teil/:coursepartid',
        controller: 'AdminCoursepartEditCtrl',
        templateUrl: 'admin/course/_course-part-edit.html',
        resolve: {
          resolveData: function(CoursepartHttpService, $stateParams) {
            return CoursepartHttpService.getCoursepart($stateParams.coursepartid);
          }
        }
      });
  }

})();
