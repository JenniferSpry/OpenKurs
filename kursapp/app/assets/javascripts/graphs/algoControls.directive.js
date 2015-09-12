(function() {
  'use strict';

  angular.module('graphs').directive('algoControls', algoControls);

  function algoControls($interval) {
    return {
      restrict: 'E',
      templateUrl:'_algoControls.html',
      replace: true,
      link: link,
      scope: {
        algorithm: '=',
        speed: '='
      }
    };

    function link(scope, element, attrs, ctrl) {

      scope.isRunning = false;
      scope.isDone = false;

      scope.renew = renew;
      scope.run = run;
      scope.pause = pause;
      scope.step = step;
      scope.reset = reset;

      var interval;

      function renew() {
        pause();
        scope.algorithm.renew();
        scope.isDone = false;
      }

      function run() {
        //do algorithm
        if (!scope.isRunning) {
          // scope.isRunning = true;
          scope.algorithm.isRunning = true;
          interval = $interval(function() {
            if (scope.algorithm.isDone) {
              pause();
              scope.isDone = true;
              // scope.isRunning = false;
              scope.algorithm.isRunning = false;
            } else {
              scope.algorithm.step();
            }
          }, scope.speed);
        }
      }

      function pause() {
        // stop running
        // scope.isRunning = false;
        scope.algorithm.isRunning = false;
        if (angular.isDefined(interval)) {
          $interval.cancel(interval);
          interval = undefined;
        }
      }

      function step() {
        if (!scope.algorithm.isRunning) {
          // do next step
          if (scope.algorithm.isDone) {
            scope.isDone = true;
          } else {
            scope.algorithm.step();
          }
        }
      }

      function reset() {
        // same graph again
        pause();
        scope.algorithm.reset();
        scope.isDone = false;
      }

      scope.$on('$destroy', function() {
        // Make sure that the interval is destroyed too
        pause();
        scope.algorithm = undefined;
      });
    }
  }

})();
