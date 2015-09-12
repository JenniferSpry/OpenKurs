(function() {
  'use strict';

  angular.module('api').service('CourseHttpService', CourseHttpService);

  function CourseHttpService($http, $q, toaster) {

    this.getAllCourses = function() {
      var deferred = $q.defer();

      $http.get('api/courses').then(
        function(response) {
          deferred.resolve(response.data);
        }, function(response) {
          toaster.error('Kurse konnten nicht geladen werden.', response.data.error);
          deferred.reject();
        });

      return deferred.promise;
    };

    this.getCourse = function(id) {
      var deferred = $q.defer();

      $http.get('api/courses/' + id).then(
        function(response) {
          deferred.resolve(response.data);
        }, function(response) {
          // toaster.error('Kurst konnte nicht geladen werden.', response.data.error);
          deferred.reject();
        });

      return deferred.promise;
    };

    this.createCourse = function(course) {
      var deferred = $q.defer();

      $http.post('api/courses', course).then(
        function(response) {
          deferred.resolve(response.data);
        }, function(response) {
          deferred.reject();
        });

      return deferred.promise;
    }

    this.updateCourse = function(course) {
      var deferred = $q.defer();

      $http.patch('api/courses/' + course.id, course).then(
        function(response) {
          deferred.resolve(response.data);
        }, function(response) {
          deferred.reject();
        });

      return deferred.promise;
    }

    this.deleteCourse = function(course) {
      var deferred = $q.defer();

      $http.delete('api/courses/' + course.id, course).then(
        function(response) {
          deferred.resolve(response.data);
        }, function(response) {
          deferred.reject();
        });

      return deferred.promise;
    }

  }

})();
