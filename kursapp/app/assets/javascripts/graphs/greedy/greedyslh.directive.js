(function() {
  'use strict';

  angular.module('greedy').directive('greedySlh', greedySlh);

  function greedySlh(simpleGraphCreatorService, randomColor, _) {
    return {
      restrict: 'E',
      templateUrl:'_greedyslh.html',
      replace: true,
      link: link
    };

    function link(scope, element, attrs, ctrl) {

      scope.usedColors = [];
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

      var cy = cytoscape({
        container: document.getElementById('cy'),
        
        style: cytoscape.stylesheet()
          .selector('node')
            .css({
              'text-valign': 'center',
              'content': 'data(order)',
              'text-opacity': 1,
              'color': '#fff',
              'background-color': '#95A5A6'
            })
          .selector('edge')
            .css({
              'width': 2,
              'line-color': '#95A5A6'
            })
          .selector('.removed')
            .css({
              'background-color': '#e2e7ea',
              'line-color': '#e2e7ea',
              'text-opacity': 1
            })
          .selector('.visible')
            .css({
              'opacity': 1,
              'content': 'data(degree)',
              'text-valign': 'top',
              'color': '#3498DB'
            })
          .selector('.select')
            .css({
              'background-color': '#333',
              'line-color': 'black',
              'border-color': 'black',
              'border-width': '2'
            })
          .selector('.select-neighbour')
            .css({
              'border-color': 'black',
              'border-width': '2'
            }),
        
        elements: simpleGraphCreatorService.create(15, 20),
        userZoomingEnabled: false,
        
        layout: {
          name: 'cose',
          animate: false
        }
      });

      // add degree to data to display it inside the node
      cy.nodes().each(function(i, n) {
        n.data('degree', n.degree());
        n.addClass('visible');
      });

      scope.algo = new Algorithm(cy);

      function Algorithm(cy) {
        var next = chooseSmallestGradeNode;
        var self = this;
        self.isDone = false;
        self.stepNumber = 0;

        var count = cy.nodes().length;

        var currentNode;

        this.step = function() {
          if (!this.isDone) next();
        };

        this.renew = function() {  
          cy.remove(cy.elements())
          cy.add(simpleGraphCreatorService.create(15, 20));
          cy.layout({ name: 'cose' });
          this.reset()
        };

        this.reset = function() {
          self.stepNumber = 0;
          count = cy.nodes().length;
          cy.nodes().each(function(i, n) {
            n.data('degree', n.degree());
            n.addClass('visible');
            n.removeClass('select');
            n.removeClass('select-neighbour');
            n.style('background-color', '#95A5A6');
          });
          cy.elements().each(function(i, ele) {
            ele.removeClass('removed');
            ele.removeClass('select');
          });
          scope.usedColors = [];
          this.isDone = false;
          next = chooseSmallestGradeNode;
        }

        function chooseSmallestGradeNode() {
          self.stepNumber = 1;
          //select node with smallest grade and highlight it
          currentNode = cy.nodes('.visible').min(function(n) {
            return n.data('degree');
          }).ele;
          currentNode.addClass('select');
          currentNode.style('background-color', '#333');
          next = removeSmallestGradeNode;
        }
        function removeSmallestGradeNode() {
          self.stepNumber = 2;
          // adjust neighbour degrees
          currentNode.neighborhood().nodes().each(function(i, n) {
            n.data('degree', (n.data('degree') - 1));
          })
          // remove node
          currentNode.data('order', count);
          count--;
          currentNode.removeClass('select');
          currentNode.removeClass('visible');
          currentNode.addClass('removed');
          currentNode.style('background-color', '#e2e7ea');
          currentNode.neighborhood('edge').addClass('removed');

          if (count === 0) {
            next = showAllNodesWithSLHOrder;
          } else {
            next = chooseSmallestGradeNode;
          }
        }
        function showAllNodesWithSLHOrder() {
          self.stepNumber = 3;
          cy.elements().each(function(i, ele) {
            ele.removeClass('removed');
          });
          cy.nodes().style('background-color', '#95A5A6');
          next = selectNode;
        }
        function selectNode() {
          self.stepNumber = 4;
          // highlight selectec node and its neighbours
          count++;
          currentNode = cy.nodes().filter(function(i, n) {
            return n.data('order') === count;
          });
          currentNode.addClass('select');
          currentNode.style('background-color', '#333');
          currentNode.neighborhood().nodes().addClass('select-neighbour');
          currentNode.neighborhood('edge').addClass('select');
          next = colorNode;
        }
        function colorNode() {
          self.stepNumber = 5;
          currentNode.removeClass('select');
          var neighbours = currentNode.neighborhood().nodes();
          neighbours.removeClass('select-neighbour');
          cy.elements('edge').removeClass('select');
          var usedColors = [];
          // select color
          for (var n = 0; n < neighbours.length; n++) {
            if (neighbours[n].data('colorId') !== undefined) {
              usedColors.push(neighbours[n].data('colorId'));
            }
          }
          var selectColor = getSmallestNumNotInArray(usedColors);
          currentNode.style('background-color', getColor(selectColor));
          currentNode.data('colorId', selectColor);
          if (count === cy.nodes().length) {
            self.isDone = true;
            self.stepNumber = 0;
          }
          next = selectNode;
        }
      }

      function getColor(i) {
        if (i >= colors.length) {
          var col = randomColor({hue: 'random'});
          scope.usedColors.push(col);
          colors.push(col);
          return col;
        } else {
          scope.usedColors.push(colors[i]);
          scope.usedColors = _.uniq(scope.usedColors);
          return colors[i];
        }
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
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] !== n) {
            return n;
          } else {
            n++;
          }
        }
        return n;
      }

      scope.$on('$destroy', function() {
        cy.destroy();
      });
    }
  }

})();
