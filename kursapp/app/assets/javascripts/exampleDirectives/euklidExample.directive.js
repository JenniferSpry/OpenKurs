(function() {
  'use strict';

  angular.module('exampleDirectives').directive('euklidExample', euklidExample);

  function euklidExample($interval, _) {
    return {
      restrict: 'E',
      templateUrl:'_euklidExample.html',
      replace: true,
      link: link
    };

    function link(scope, element, attrs, ctrl) {
      var interval, current1, current2, step, i;
      scope.isRunning = false;
      scope.number1 = 12;
      scope.number2 = 44;
      scope.result = undefined;

      function reset() {
        step = 1;
        current1 = angular.copy(scope.number1);
        current2 = angular.copy(scope.number2);
        scope.result = undefined;
        scope.number1Parts = [];
        for (i = 0; i < scope.number1; i++) {
          scope.number1Parts.push({
            number: i,
            highlighted: false,
            gone: false
          });
        }
        scope.number2Parts = [];
        for (i = 0; i < scope.number2; i++) {
          scope.number2Parts.push({
            number: i,
            highlighted: false,
            gone: false
          });
        }
      }
      scope.start = function() {
        reset();
        scope.isRunning = true;
        interval = $interval(function() {
          if (step === 1) {
            // calc and highlight
            if (current2 != current1) {
              if (current1 > current2) {
                current1 = current1 - current2;
                for (i = current1; i < scope.number1Parts.length; i++) {
                  scope.number1Parts[i].highlighted = true;
                }
              } else {
                current2 = current2 - current1;
                for (i = current2; i < scope.number2Parts.length; i++) {
                  scope.number2Parts[i].highlighted = true;
                }
              }
            } else {
              scope.result = current1;
              stop();
            }
          } else {
            // remove
            for (i = current1; i < scope.number1Parts.length; i++) {
              scope.number1Parts[i].gone = true;
            }
            for (i = current2; i < scope.number2Parts.length; i++) {
              scope.number2Parts[i].gone = true;
            }
          }
          step++;
          if (step === 3) step = 1;
        }, 500);
      }

      reset();

      function stop() {
        scope.isRunning = false;
        if (angular.isDefined(interval)) {
          $interval.cancel(interval);
          interval = undefined;
        }
      }

      scope.$on('$destroy', function() {
        stop();
      });
    }// end link
  }

})();
