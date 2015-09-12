(function() {
  'use strict';

  angular.module('greedy').directive('greedy', greedy);

  function greedy(simpleGraphCreatorService, randomColor, _) {
    return {
      restrict: 'E',
      templateUrl:'_greedy.html',
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
              'content': 'data(id)',
              'text-opacity': 0,
              'color': '#fff',
              'background-color': '#95A5A6'
            })
          .selector('edge')
            .css({
              'width': 2,
              'line-color': '#95A5A6'
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

      scope.algo = new Algorithm(cy);

      function Algorithm(cy) {
        var next = showNumbers;
        var self = this;
        self.isDone = false;
        self.stepNumber = 0;

        var count = 0;

        var currentNode;

        this.step = function() {
          if (!this.isDone) next();
        };

        this.renew = function() {
          cy.remove(cy.elements())
          cy.add(simpleGraphCreatorService.create(15, 20));
          cy.layout({ name: 'cose' });
          this.reset();
        };

        this.reset = function() {
          count = 0
          cy.nodes().style('text-opacity', 0);
          cy.nodes().style('background-color', '#95A5A6');
          scope.usedColors = [];
          cy.nodes().each(function(i, n) {
            n.removeClass('select');
            n.removeClass('select-neighbour');
          });
          cy.elements('edge').removeClass('select');
          next = showNumbers;
          self.stepNumber = 0;
          this.isDone = false;
        };

        function showNumbers() {
          self.stepNumber = 1;
          cy.nodes().style('text-opacity', 1);
          next = selectNode;
        }
        function selectNode() {
          self.stepNumber = 2;
          // highlight selectec node and its neighbours
          currentNode = cy.$('#' + (count + 1));
          count++;
          currentNode.addClass('select');
          currentNode.style('background-color', '#333');
          currentNode.neighborhood().nodes().addClass('select-neighbour');
          currentNode.neighborhood('edge').addClass('select');
          next = colorNode;
        }
        function colorNode() {
          self.stepNumber = 3;
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

      function getColor(m) {
        if (m >= colors.length) {
          colors.push(randomColor({hue: 'random'}));
        } 
        scope.usedColors.push(colors[m]);
        scope.usedColors = _.uniq(scope.usedColors);
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
