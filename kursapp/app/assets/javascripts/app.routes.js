(function() {
  'use strict';

  angular.module('kursapp').config(config);

  function config($stateProvider, $urlRouterProvider) {
    // find admin states in the admin module
    $stateProvider
      .state('start', {
        url: '/start',
        controller: 'StartCtrl',
        templateUrl: 'start/_start.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'auth/_login.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function() {
            $state.go('start');
          })
        }]
      })
      .state('register', {
        url: '/register',
        templateUrl: 'auth/_register.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function() {
            $state.go('start');
          })
        }]
      })
      .state('kursAll', {
        url: '/kurs',
        controller: 'CourseCtrl',
        templateUrl: 'course/_all-courses.html',
        resolve: {
          resolveData: function(CourseHttpService) {
            return CourseHttpService.getAllCourses();
          }
        }
      })
      .state('kursteil', {
        url: '/kurs/:id/:partId',
        controller: 'SingleCourseCtrl',
        templateUrl: 'course/_single-course.html',
        resolve: {
          resolveData: function(CourseHttpService, $stateParams) {
            return CourseHttpService.getCourse($stateParams.id);
          },
          partData: function(CoursepartHttpService, $stateParams) {
            return CoursepartHttpService.getCoursepart($stateParams.partId);
          }
        }
      })
      .state('impressum', {
        url: '/impressum',
        templateUrl: '_impressum.html'
      });
    $urlRouterProvider.otherwise('start');
  }

})();
