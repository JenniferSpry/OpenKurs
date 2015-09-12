(function() {
  'use strict';

  angular.module('api').service('CoursepartHttpService', CoursepartHttpService);

  function CoursepartHttpService($http, $q, toaster) {

    this.getAllCourseparts = function(id) {
      var deferred = $q.defer();

      $http.get('api/courses/' + id + '/course_parts').then(
        function(response) {
          deferred.resolve(response.data);
        }, function(response) {
          deferred.reject();
        });

      return deferred.promise;
    };

    this.getCoursepart = function(partId) {
      var deferred = $q.defer();

      $http.get('api/course_parts/' + partId).then(
        function(response) {
          deferred.resolve(response.data);
        }, function(response) {
          toaster.error('Kursteil konnte nicht gefunden werden.', response.error);
          deferred.reject();
        });

      return deferred.promise;
    }

    this.createCoursepart = function(courseId, part) {
      var deferred = $q.defer();

      $http.post('api/courses/' + courseId + '/course_parts', part).then(
        function(response) {
          deferred.resolve(response.data);
        }, function(response) {
          deferred.reject();
        });

      return deferred.promise;
    }

    this.updateCoursepart = function(part) {
      var deferred = $q.defer();

      $http.put('api/course_parts/' + part.id, part).then(
        function(response) {
          deferred.resolve(response.data);
        }, function(response) {
          deferred.reject();
        });

      return deferred.promise;
    }

    this.deleteCoursepart = function(part) {
      var deferred = $q.defer();

      $http.delete('api/course_parts/' + part.id).then(
        function(response) {
          deferred.resolve(response.data);
        }, function(response) {
          deferred.reject();
        });

      return deferred.promise;
    }

    this.setCoursepartDone = function(partId) {
      var deferred = $q.defer();
      $http.post('api/user_done_course_parts', {course_part_id: partId}).then(
        function(response) {
          deferred.resolve(response.data);
        }, function(response) {
          toaster.error('Fehler', response.data.error);
          deferred.reject();
        });

      return deferred.promise;
    }

  }

})();
