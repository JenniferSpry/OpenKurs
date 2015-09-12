(function() {
  'use strict';

  angular.module('exampleDirectives').directive('detDetExample', detDetExample);

  function detDetExample($interval, _) {
    return {
      restrict: 'E',
      templateUrl:'_detDetExample.html',
      replace: true,
      link: link
    };

    function link(scope, element, attrs, ctrl) {
      scope.holes = [];
      scope.running = false;
      var interval, numberHoles = 60, count = 0, i = 0;

      function init() {
        for (i = 0; i < numberHoles; i++) {
          scope.holes[i] = {
            number: i,
            drilled: false
          };
        }
        scope.holes2 = _.shuffle(angular.copy(scope.holes)); 
      }

      init();

      scope.start = function() {
        if (!scope.running) {
          scope.running = true;
          interval = $interval(function() {
            if (count === numberHoles) {
              count = 0;
              init();
            }
            scope.holes[count].drilled = true;
            _.findWhere(scope.holes2, {number: count}).drilled = true;
            count++;
          }, 200);
        }
      };
      scope.stop = function() {
        scope.running = false;
        if (angular.isDefined(interval)) {
          $interval.cancel(interval);
          interval = undefined;
        }
      };

      scope.$on('$destroy', function() {
        scope.stop();
      });
    }
  }

})();
