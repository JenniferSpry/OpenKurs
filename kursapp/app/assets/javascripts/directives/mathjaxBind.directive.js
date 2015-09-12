(function() {
  'use strict';

  angular.module('directives').directive('mathjaxBind', mathjaxBind);

  function mathjaxBind(MathJax) {
    return {
      restrict: 'A',
      controller: controller
    };

    function controller($scope, $element, $attrs) {
      $scope.$watch($attrs.mathjaxBind, function(value) {
        var $script = angular.element('<script type="math/tex">')
            .html(value == undefined ? '' : value);
        $element.html('');
        $element.append($script);
        MathJax.Hub.Queue(['Reprocess', MathJax.Hub, $element[0]]);
      });
    }
  }

})();
