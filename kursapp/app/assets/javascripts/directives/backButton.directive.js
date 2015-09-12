(function() {
  'use strict';

  angular.module('directives').directive('backButton', backButton);

  function backButton($window) {
    return {
      template: '<button type="button" class="btn btn-default navbar-btn">Zurück</button>',
      link: link
    };

    function link(scope, element, attrs, ctrl) {
      element.on('click', function() {
        $window.history.back();
      });
    }
  }

})();
