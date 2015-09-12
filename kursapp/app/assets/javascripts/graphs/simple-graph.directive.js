(function() {
  'use strict';

  angular.module('graphs').directive('simpleGraph', simpleGraph);

  function simpleGraph($timeout, graphHelper, simpleGraphCreatorService, graphInterpreterService, randomColor, _) {
    return {
      restrict: 'E',
      template:'<div id="{{cyName}}"></div>',
      replace: true,
      link: link,
      scope: {
        numNodes: '=',
        nodes: '=',
        edges: '=',
        cyName: '=',
        directed: '=',
        nameEdges: '=',
        layout: '=',
        gridRows: '=',
        gridCols: '=',
        bfroot: '=',
        highlight: '=',
        highlightWithEdges: '=',
        concentricLayers: '=',
        colorClasses: '='
      }
    };

    function link(scope, element, attrs, ctrl) {
      var cy, graph;

      var layouts = {
        cose: {
          name: 'cose',
          padding: 10
        },
        grid: {
          name: 'grid',
          padding: 10,
          avoidOverlap: true,
          fit: true
        },
        breadthfirst: {
          name: 'breadthfirst',
          directed: false,
          padding: 10
        },
        circle: {
          name: 'circle'
        },
        concentric: {
          name: 'concentric',
          concentric: function(node) { // returns numeric value for each node, placing higher nodes in levels towards the centre
            return node.data('layer');
          },
          fit: true,
          minNodeSpacing: 50,
          padding: 10
        }
      };

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

      if (angular.isDefined(scope.nodes) && angular.isDefined(scope.edges)) {
        graph = graphInterpreterService.interpret(scope.nodes, scope.edges);
      } else {
        graph = simpleGraphCreatorService.create(scope.numNodes);
      }

      var arrowStyle = 'none';
      if (scope.directed) {
        arrowStyle = 'triangle';
      }

      var edgeContent = 'data(weight)';
      if (scope.nameEdges) {
        edgeContent = 'data(id)';
      }

      var layout = layouts.cose;
      if (scope.layout && angular.isDefined(layouts[scope.layout])) {
        if (scope.layout === 'breadthfirst') {
          if (angular.isDefined(scope.bfroot) && (_.intersection(scope.bfroot, scope.nodes).length > 0)) {
            layout = layouts[scope.layout];
            layout.roots = graphHelper.arrayToCySelection(scope.bfroot);
          }
        } else if (scope.layout === 'grid') {
          layout = layouts[scope.layout];
          if (angular.isDefined(scope.gridRows)) {
            layout.rows = scope.gridRows;
          }
          if (angular.isDefined(scope.gridCols)) {
            layout.columns = scope.gridCols;
          }
        } else {
          layout = layouts[scope.layout];
        }
      }

      $timeout(function() {  
        cy = cytoscape({
          container: $('#' + scope.cyName)[0],
          
          style: cytoscape.stylesheet()
            .selector('node')
              .css({
                content: 'data(id)',
                'text-valign': 'center',
                'text-outline-width': 2,
                'color': 'white',
                'text-outline-color': '#888'
               })
            .selector('edge')
              .css({
                content: edgeContent,
                'target-arrow-shape': arrowStyle,
                'target-arrow-color': '#61bffc',
                'color': 'white',
                'text-outline-width': 2,
                'text-outline-color': '#61bffc',
                'width': 2,
                'line-color': '#61bffc'
              })
            .selector('.node-highlighted')
              .css({
                'background-color': '#2C3E50',
                'text-outline-color': '#2C3E50'
              })
            .selector('.highlight-edge')
              .css({
                'line-color': '#888'
              })
            .selector('.highlight-edge-highlighted')
              .css({
                'line-color': '#2C3E50'
              }),

          layout: layout,
          ready: processNodes,
          
          elements: graph,
          userZoomingEnabled: false
        });
      });

      function processNodes() {
        highlight();
        color();
      }

      function highlight() {        
        if (angular.isDefined(scope.highlight) && scope.highlight.length > 0) {
          cy.nodes(graphHelper.arrayToCySelection(scope.highlight)).addClass('node-highlighted');
          cy.edges().addClass('highlight-edge');
          if (scope.highlightWithEdges) {
            cy.edges().addClass('highlight-edge-highlighted');
            cy.nodes('.node-highlighted').complement().connectedEdges().removeClass('highlight-edge-highlighted');
          }
        }
      }

      function color() { 
        if (angular.isDefined(scope.colorClasses) && scope.colorClasses.length > 0) {
          for (var i = 0; i < scope.colorClasses.length; i++) {
            cy.nodes(graphHelper.arrayToCySelection(scope.colorClasses[i])).style('background-color', getColor(i));
          }
        }
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

      scope.$on('$destroy', function() {
        cy.destroy();
      });
    }
  }

})();
