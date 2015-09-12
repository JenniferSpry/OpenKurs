(function() {
  'use strict';

  angular.module('directives').directive('courseStatePanel', courseStatePanel);

  function courseStatePanel($state) {
    return {
      restrict: 'E',
      scope: {
        percent: '='
      },
      templateUrl: '_course-state-panel.html',
      link: link
    };

    function link(scope, element, attrs, ctrl) {
      scope.showNext = $state.current.name !== 'kursAll';
    }
  }

})();
