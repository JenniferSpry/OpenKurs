(function() {
  'use strict';

  angular.module('directives').directive('doneIcon', doneIcon);

  function doneIcon() {
    return {
      restrict: 'E',
      scope: {
        done: '=',
        num: '='
      },
      templateUrl: '_done-icon.html'
    };
  }

})();
