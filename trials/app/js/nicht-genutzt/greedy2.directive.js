/**
 * Greedy nach Turau
 */
(function() {
  'use strict';

  angular.module('graphs').directive('greedy2', greedy);

  function greedy($timeout, simpleGraphCreatorService, randomColor, _) {
    return {
      restrict: 'E',
      templateUrl:'js/graphs/_greedy.html',
      replace: true,
      link: link
    };

    function link(scope, element, attrs, ctrl) {

      var colors = [
        'red',
        'green',
        'blue',
        'orange',
        '#40FF00',
        '#FA58F4',
        randomColor({hue: 'random'}),
        randomColor({hue: 'random'}),
        randomColor({hue: 'random'}),
        randomColor({hue: 'random'}),
        randomColor({hue: 'random'}),
        randomColor({hue: 'random'})
      ];
      var cy;

      cy = cytoscape({
        container: document.getElementById('cy'),
        
        style: cytoscape.stylesheet()
          .selector('node')
            .css({
              'text-valign': 'center',
              'content': 'data(id)',
              'text-opacity': 1,
              'color': '#fff'
            })
          .selector('edge')
            .css({
              'width': 2,
              'line-color': '#444'
            })
          .selector('.select')
            .css({
              'background-color': '#555',
              'border-color': 'black',
              'border-width': '2'
            })
          .selector('.select-neighbour')
            .css({
              'border-color': 'black',
              'border-width': '2'
            }),
        
        elements: simpleGraphCreatorService.create(12, 0),
        userZoomingEnabled: false,
        
        layout: {
          name: 'cose',
          animate: false
        },
        ready: greedy2
      });

      function greedy2() {
        var steps = 0;
        var f = [0, 0, 0, 0, 0]; // node farben zuweisung
        var x = 0;
        var vergeben = [];
        var nId;
        var node = cy.$('#0').style('background-color', colors[0]);
        f[0] = 1;

        for (var i = 1; i < cy.nodes().length; i++) {
          steps++;
          node = cy.$('#' + i);
          // console.log('---coloring node----');
          // console.log('id: ' + node.data('id'));
          var neighbours = node.neighborhood().nodes();
          for (var j = 0; j < neighbours.length; j++) {
            steps++;
            nId = neighbours[j].data('id');
            // console.log('neighbour: ' + nId);
            if (f[nId] > 0) {
              vergeben[f[nId]] = 1;
            }
          }
          var k = 1;
          while (vergeben[k] == 1) {
            k = k + 1;
          }
          f[i] = k;
          node.style('background-color', colors[k]);
          for (j = 0; j < neighbours.length; j++) {
            steps++;
            nId = neighbours[j].data('id');
            if (f[nId] > 0) {
              vergeben[f[nId]] = 0;
            }
          }
        }
        console.log('nodes: ' + cy.nodes().length);
        console.log('edges: ' + cy.edges().length);
        console.log('n+m = ' + (cy.nodes().length + (1 * cy.edges().length)));
        console.log('2m = ' + (2 * cy.edges().length));
        console.log(steps);
      }

    }
  }

})();
