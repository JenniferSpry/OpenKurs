(function() {
  'use strict';

  angular.module('lawler').directive('lawler', lawler);

  function lawler($timeout, graphHelper, exampleGraph, _) {
    return {
      restrict: 'E',
      templateUrl:'_lawler.html',
      replace: true,
      link: link
    };

    function link(scope, element, attrs, ctrl) {
      var cy;
      var graph = exampleGraph.getGraph();
      scope.graph = graph.elements;
      scope.nodes = graph.nodes;

      scope.algo = new Algorithm();

      function Algorithm() {
        var next = calculateSubsets;
        var self = this;
        self.isDone = false;
        self.stepNumber = 0;
        self.currentSet = 0;
        var currentSetStage = 0;

        this.step = function() {
          if (!self.isDone) next();
        };

        this.renew = function() {
          var graph = exampleGraph.getGraph();
          scope.graph = graph.elements;
          scope.nodes = graph.nodes;
          cy.remove(cy.elements())
          cy.add(graph.elements);
          cy.layout();
          this.reset();
        };

        this.reset = function() {
          self.stepNumber = 0;
          self.currentSet = 0;
          currentSetStage = 0;
          this.isDone = false;
          next = calculateSubsets;
          scope.subsets = [];
        };

        function calculateSubsets() {
          self.stepNumber = 1;
          var subsets = graphHelper.createSubsets(scope.nodes);
          
          scope.subsets = [];

          var  setName;
          for (var i = 0; i < subsets.length; i++) {
            setName = subsets[i].toString().replace(/\,/g,'');
            scope.subsets[i] = {
              arr: subsets[i],
              name: setName,
              stage: 0
            };
          };
          next = setSubgraphStage;
        }

        function setSubgraphStage() {
          self.stepNumber++;
          if (self.stepNumber > 5) self.stepNumber = 2;

          currentSetStage++;
          scope.subsets[self.currentSet].stage++;
          if (currentSetStage > 4) { 
            currentSetStage = 1;
            self.currentSet++;
            if (self.currentSet >= scope.subsets.length) {
              self.isDone = true;
              self.stepNumber = 6;
            } else {
              scope.subsets[self.currentSet].stage++;
            }
          }
        }
        
      }

      $timeout(function() { 
        cy = cytoscape({
          container: $('#base-graph')[0],
          
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
                'color': 'white',
                'width': 2,
                'line-color': '#888'
              }),

          userZoomingEnabled: false,
          userPanningEnabled: false,
          
          layout: {
            name: 'breadthfirst',
            directed: false,
            roots: '#a, #b',
            padding: 10
          },
          
          elements: graph.elements
        });
      });

      scope.$on('$destroy', function() {
        cy.destroy();
      });
    }
  }

})();
