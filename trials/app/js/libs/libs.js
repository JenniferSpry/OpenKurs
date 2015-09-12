(function() {
  'use strict';

  angular.module('libs', [])
    .factory('_', function($window) {
      return $window._; // assumes underscore has already been loaded on the page
    })
    .factory('randomColor', function($window) {
      return $window.randomColor; // assumes randomcolor has already been loaded on the page
    })
    .factory('MathJax', function($window) {
      MathJax.Hub.Config({
        skipStartupTypeset: true,
        'HTML-CSS': { 
          linebreaks: { automatic: true, width: 'container'},
          showMathMenu: false
        },
        'SVG': { 
          linebreaks: { automatic: true, width: 'container' }
        },
        messageStyle: 'none'
      });
      MathJax.Hub.Configured();
      return $window.MathJax;
    });

})();
