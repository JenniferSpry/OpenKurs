(function() {
  'use strict';

  angular.module('greedy').directive('greedyEnumeration', greedyEnumeration);

  function greedyEnumeration(simpleGraphCreatorService, graphHelper, randomColor, _) {
    return {
      restrict: 'E',
      templateUrl:'_greedy-enumeration.html',
      replace: true,
      link: link
    };

    function link(scope, element, attrs, ctrl) {

      // define some colors so at least the first colors will be destinct
      // if more colors are needed they will be created with randomColor
      var colors = [
        'red',
        'green',
        'blue',
        'orange',
        '#40FF00',
        '#FA58F4'
      ];

      scope.numNodes = 5;

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
        
        elements: simpleGraphCreatorService.create(scope.numNodes, scope.numNodes),
        userZoomingEnabled: false,
        userPanningEnabled: false,
        
        layout: {
          name: 'cose',
          animate: false
        }
      });

      scope.algo = new Algorithm(cy);
      scope.testCount = -1;
      scope.nodeOrders = [];
      scope.smallestColorNumer = scope.numNodes;
      scope.indexSmallestColorOrder = null;

      function Algorithm(cy) {
        var next = calcNodeOrders;
        var self = this;
        this.isDone = false;
        self.stepNumber = 0;

        this.step = function() {
          if (!self.isDone) next();
        };

        this.renew = function() {
          if (!angular.isDefined(scope.numNodes)) scope.numNodes = 5;
          cy.remove(cy.elements())
          cy.add(simpleGraphCreatorService.create(scope.numNodes, scope.numNodes));
          cy.layout({ name: 'cose' });
          this.reset();
        };

        this.reset = function() {
          self.stepNumber = 0;
          cy.nodes().style('text-opacity', 0);
          cy.nodes().style('background-color', '#95A5A6');
          scope.nodeOrders = [];
          scope.testCount = -1;
          scope.smallestColorNumer = scope.numNodes;
          scope.indexSmallestColorOrder = null;
          next = calcNodeOrders;
          this.isDone = false;
        };

        function calcNodeOrders() {
          self.stepNumber = 1;
          var nodeIds = [];
          cy.nodes().each(function(i, ele) {
            nodeIds.push(ele.id());
          });
          scope.nodeOrders = graphHelper.permute(nodeIds);
          next = colorGraph;
        }

        function colorGraph() {
          self.stepNumber = 2;
          scope.testCount++;
          if (scope.testCount >= scope.nodeOrders.length) {
            showResult();
          } else {
            next = colorGraph;

            var colorsUsed = colorGraphByOrder(scope.nodeOrders[scope.testCount]);
            if (colorsUsed < scope.smallestColorNumer) {
              scope.smallestColorNumer = colorsUsed;
              scope.indexSmallestColorOrder = scope.testCount;
            }
          }
          
        }
        function showResult() {
          self.stepNumber = 3;
          self.isDone = true;
          colorGraphByOrder(scope.nodeOrders[scope.indexSmallestColorOrder]);
        }
      } // end algorithm

      function colorGraphByOrder(order) {
        cy.nodes().style('text-opacity', 1);
        cy.nodes().removeData('colorId');

        var usedColorsGraph, currentNode, neighbours, usedColors, selectColor, col;

        usedColorsGraph = [];

        for (var i = 0; i < cy.nodes().length; i++) {
          currentNode = cy.$('#' + order[i]);
          neighbours = currentNode.neighborhood().nodes();
          usedColors = [];
          // select color
          for (var n = 0; n < neighbours.length; n++) {
            if (neighbours[n].data('colorId') !== undefined) {
              usedColors.push(neighbours[n].data('colorId'));
            }
          }
          selectColor = getSmallestNumNotInArray(usedColors);
          col = getColor(selectColor);
          currentNode.style('background-color', col);
          usedColorsGraph.push(col);
          usedColorsGraph = _.uniq(usedColorsGraph);
          currentNode.data('colorId', selectColor);
        };
        return usedColorsGraph.length;
      }

      function getColor(m) {
        if (m >= colors.length) {
          colors.push(randomColor({hue: 'random'}));
        } 
        return colors[m];
      }

      function getSmallestNumNotInArray(arr) {
        if (arr.length === 0) return 0;
        // duplikate entfernen
        arr = arr.filter(function(item, pos) {
          return arr.indexOf(item) == pos;
        });
        // sort array
        arr.sort(function(a, b) {return a - b;});
        var n = 0;
        for (var k = 0; k < arr.length; k++) {
          if (arr[k] !== n) {
            return n;
          } else {
            n++;
          }
        }
        return n;
      }

      scope.getNOString = function(arr) {
        if (!arr) return '';
        arr = arr.toString().replace(/\,/g, ', ');
        return arr.replace(/"/g, '');
      }

      scope.restart = function() {
        scope.algo.isRunning = false;
        scope.algo.renew();
      }

      scope.$on('$destroy', function() {
        cy.destroy();
      });
    }
  }

})();
