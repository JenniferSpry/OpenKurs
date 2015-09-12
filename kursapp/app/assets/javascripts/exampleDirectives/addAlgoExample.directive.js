(function() {
  'use strict';

  angular.module('exampleDirectives').directive('addAlgoExample', addAlgoExample);

  function addAlgoExample($interval, _) {
    return {
      restrict: 'E',
      templateUrl:'_addAlgoExample.html',
      replace: true,
      link: link
    };

    function link(scope, element, attrs, ctrl) {
      scope.number1 = 12345;
      scope.number2 = 990867;
      scope.calculated = false;

      scope.calc = function() {
        var i, n1, n2, r;
        if (angular.isDefined(scope.number1) && angular.isDefined(scope.number2)) {
          scope.calculated = true;
          scope.result = parseInt(scope.number1) + parseInt(scope.number2);

          scope.displayResult = (scope.result + '').split('');
          scope.displayNumber1 = (scope.number1 + '').split('');
          while (scope.displayNumber1.length < scope.displayResult.length) {
            scope.displayNumber1.unshift(''); 
          }
          scope.displayNumber2 = (scope.number2 + '').split('');
          while (scope.displayNumber2.length < scope.displayResult.length) {
            scope.displayNumber2.unshift(''); 
          }
           
          scope.displayOverflow = [];
          for (i = scope.displayResult.length - 1; i >= 0 ; i--) {
            n1 = parseInt(scope.displayNumber1[i]);
            n2 = parseInt(scope.displayNumber2[i]);
            if (n1 && n2 && n1 > 0  && n2 > 0) {
              r = n1 + n2;
              if (r > 10) {
                scope.displayOverflow.unshift(((n1 + n2) + '').split('')[0]);
              } else {
                scope.displayOverflow.unshift(0);
              }           
            } else {
              scope.displayOverflow.unshift(0);
            }
          }
          scope.displayOverflow.shift();
          scope.displayOverflow.push('');
        }
      };
    }
  }

})();
