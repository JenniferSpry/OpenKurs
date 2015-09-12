/**
 * Display a simple greedy coloured graph
 */
(function() {
  'use strict';

  angular.module('greedy').directive('greedyColoured', greedyColoured);

  function greedyColoured($timeout, simpleGraphCreatorService, randomColor, _) {
    return {
      restrict: 'E',
      template:'<div id="greedy-coloured-cy"></div>',
      replace: true,
      link: link
    };

    function link(scope, element, attrs, ctrl) {

      var colors = [
        'red',
        '#18BC9C',
        '#3498DB',
        '#F39C12',
        '#E74C3C',
        'green',
        'blue',
        'orange',
        '#40FF00',
        '#FA58F4'
      ];

      var cy = cytoscape({
        container: document.getElementById('greedy-coloured-cy'),
        
        style: cytoscape.stylesheet()
          .selector('node')
            .css({
              'text-valign': 'center',
              'border-color': '#fff',
              'border-width': 1,
              'color': '#fff'
            })
          .selector('edge')
            .css({
              'width': 2,
              'line-color': 'white'
            }),
        
        elements: simpleGraphCreatorService.create(25, 30),
        userZoomingEnabled: false,

        ready: color,
        
        layout: {
          name: 'cose',
          fit: true,
          padding: 5,
          animate: true
        }
      });

      function color() {
        for (var i = 0; i < cy.nodes().length; i++) {
          var node = cy.$('#' + (i + 1));
          var neighbours = node.neighborhood().nodes();
          var usedColors = [];
          // select color
          for (var n = 0; n < neighbours.length; n++) {
            if (!(neighbours[n].data('colorId') == undefined)) {
              usedColors.push(neighbours[n].data('colorId'));
            }
          };
          var selectColor = getSmallestNumNotInArray(usedColors);
          node.style('background-color', getColor(selectColor));
          node.data('colorId', selectColor);
        };
      }

      function getColor(i) {
        if (i >= colors.length) {
          var col = randomColor({hue: 'random'});
          colors.push(col);
          return col;
        } else {
          return colors[i];
        }
      }

      function getSmallestNumNotInArray(arr) {
        if (arr.length === 0) return 0;
        // duplikate entfernen
        arr = arr.filter(function(item, pos) {
          return arr.indexOf(item) == pos;
        })
        // sort array
        arr.sort(function(a, b) {return a - b});
        var n = 0;
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] !== n) {
            return n;
          } else {
            n++;
          }
        };
        return n;
      }
    }
  }

})();
