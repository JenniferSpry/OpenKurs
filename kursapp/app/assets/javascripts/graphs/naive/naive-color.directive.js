(function() {
  'use strict';

  angular.module('naiveColorModule').directive('naiveColor', naiveColor);

  function naiveColor(simpleGraphCreatorService, graphHelper, _) {
    return {
      restrict: 'E',
      templateUrl:'_naive-color.html',
      replace: true,
      link: link
    };

    function link(scope, element, attrs, ctrl) {
      
      var colors = ['red', '#18BC9C', '#3498DB', '#F39C12'];

      var cy = cytoscape({
        container: document.getElementById('cy'),
        
        style: cytoscape.stylesheet()
          .selector('node')
            .css({
              'text-valign': 'center',
              'content': 'data(id)',
              'text-opacity': 0,
              'color': '#fff',
              'background-color': '#95A5A6'
            })
          .selector('edge')
            .css({
              'width': 2,
              'line-color': '#444'
            }),
        
        elements: simpleGraphCreatorService.create(4, 5),
        userZoomingEnabled: false,
        userPanningEnabled: false,
        
        layout: {
          name: 'cose',
          animate: false
        }
      });

      var partitions = [
        [
          [['1', '2', '3', '4']]
        ], [
          [['1', '2'], ['3', '4']],
          [['1', '3'], ['2', '4']],
          [['1', '4'], ['2', '3']],
          [['1'], ['2', '3', '4']],
          [['2'], ['1', '3', '4']],
          [['3'], ['2', '1', '4']],
          [['4'], ['2', '3', '1']]
        ], [
          [['1', '2'], ['3'], ['4']],
          [['1', '3'], ['2'], ['4']],
          [['1', '4'], ['3'], ['2']],
          [['2', '3'], ['1'], ['4']],
          [['2', '4'], ['1'], ['3']],
          [['1'], ['2'], ['3', '4']]
        ],
        [
          [['1'], ['2'], ['3'], ['4']]
        ]
      ]

      scope.algo = new Algorithm(cy);

      function Algorithm(cy) {
        var next = checkPartition;
        var self = this;
        var levelCounter = 0, partitionCounter = 0, levelSize = 1;
        this.isDone = false;
        self.stepNumber = 0;
        scope.currentlyChecking;

        this.step = function() {
          if (!self.isDone) next();
        };

        this.renew = function() {
          cy.remove(cy.elements())
          cy.add(simpleGraphCreatorService.create(4, 5));
          cy.layout();
          this.reset();
        };

        this.reset = function() {
          self.stepNumber = 0;
          cy.nodes().style('background-color', '#95A5A6');
          next = checkPartition;
          self.isDone = false;
          levelCounter = 0;
          partitionCounter = 0;
          levelSize = 1;
        };

        var i, isLegal;
        function checkPartition() {
          scope.currentlyChecking = levelCounter + 1;
          self.stepNumber = 1;
          // color Graph
          for (i = partitions[levelCounter][partitionCounter].length - 1; i >= 0; i--) {
            cy.nodes(graphHelper.arrayToCySelection(partitions[levelCounter][partitionCounter][i])).style('background-color', colors[i]);
            cy.nodes(graphHelper.arrayToCySelection(partitions[levelCounter][partitionCounter][i])).data('color', i);
          };
          //check if legal
          isLegal = true;
          cy.nodes().each(function(i, node) {
            if (node.neighborhood('[color = ' + node.data('color') + ']').length > 0) isLegal = false;
          });
          if (isLegal) {
            self.isDone = true;
            self.stepNumber = 2;
          } else { 
            partitionCounter++;
            if (partitionCounter >= levelSize) {
              levelCounter++;
              partitionCounter = 0;
              levelSize = partitions[levelCounter].length;
            }        
          }
        }
      } // end algorithm

      scope.$on('$destroy', function() {
        cy.destroy();
      });
    }
  }

})();
