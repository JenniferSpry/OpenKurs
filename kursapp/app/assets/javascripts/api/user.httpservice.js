(function() {
  'use strict';

  angular.module('api').service('UserHttpService', UserHttpService);

  function UserHttpService($http, $q, toaster) {

    this.getAllUsers = function() {
      var deferred = $q.defer();

      $http.get('api/users').then(
        function(response) {
          deferred.resolve(response.data);
        }, function(response) {
          toaster.error('User konnten nicht geladen werden.', response.data.error);
          deferred.reject();
        });

      return deferred.promise;
    };

    this.getUserDonePercent = function(userId) {
      var deferred = $q.defer();

      $http.get('api/user-done/' + userId).then(
        function(response) {
          deferred.resolve(response.data);
        }, function(response) {
          toaster.error('Daten konnten nicht geladen werden.', response.data.error);
          deferred.reject();
        });

      return deferred.promise;
    };
  }

})();
