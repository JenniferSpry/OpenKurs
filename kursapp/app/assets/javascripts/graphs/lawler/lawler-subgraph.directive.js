(function() {
  'use strict';

  angular.module('lawler').directive('lawlerSubgraph', lawlerSubgraph);

  function lawlerSubgraph($timeout, graphHelper) {
    return {
      restrict: 'E',
      templateUrl: '_lawler-subgraph.html',
      replace: true,
      link: link,
      scope: {
        graph: '=',
        show: '=',
        highlight: '=',
        cyName: '='
      }
    };

    function link(scope, element, attrs, ctrl) {
      var cy;

      if (scope.highlight.length > 0) {       
        $timeout(function() { 
          cy = cytoscape({
            container: $('#' + scope.cyName)[0],
            
            style: cytoscape.stylesheet()
              .selector('node')
                .css({
                  'opacity': 0,
                  'content': 'data(id)',
                  'color': 'white',
                  'text-valign': 'center'
                 })
              .selector('edge')
                .css({
                  'opacity': 0,
                  'width': 2
                })
              .selector('.show-node')
                .css({
                  'opacity': 1,
                  'background-color': '#f5f5f5'
                })
              .selector('.highlight-node')
                .css({
                  'opacity': 1,
                  'background-color': '#aaa'
                })
              .selector('.show-edge')
                .css({
                  'opacity': 1,
                  'line-color': '#f5f5f5'
                })
              .selector('.highlight-edge')
                .css({
                  'opacity': 1,
                  'line-color': '#aaa'
                }),

            userZoomingEnabled: false,
            userPanningEnabled: false,
            
            layout: {
              name: 'breadthfirst',
              directed: false,
              roots: '#a, #b',
              padding: 10
            },
            
            elements: scope.graph,
            ready: showAndSelect
          });
        });
      }

      function showAndSelect() {
        if (scope.show.length > 0) {
          cy.nodes(graphHelper.arrayToCySelection(scope.show)).addClass('show-node');
          cy.edges().addClass('show-edge');
          cy.nodes('.show-node').complement().connectedEdges().removeClass('show-edge');
        }
        
        if (scope.highlight.length > 0) {
          cy.nodes(graphHelper.arrayToCySelection(scope.highlight)).addClass('highlight-node');
          cy.edges().addClass('highlight-edge');
          cy.nodes('.highlight-node').complement().connectedEdges().removeClass('highlight-edge');
        }
      }

      scope.$on('$destroy', function() {
        if (angular.isDefined(cy)) cy.destroy();
      });
    }
  }

})();
