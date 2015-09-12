(function() {
  'use strict';

  angular.module('lawler').directive('lawlerStep', lawlerStep);

  function lawlerStep($document, graphHelper) {
    return {
      restrict: 'E',
      templateUrl:'_lawler-step.html',
      replace: true,
      link: link,
      scope: {
        graph: '=',
        nodes: '=', // needed by the lawler-subgraph-directive
        set: '=',
        subsets: '=',
        onNext: '='
      }
    };

    function link(scope, element, attrs, ctrl) {
      scope.independentSets = [];
      scope.komplements = [];
      
      var cy = cytoscape({
        elements: scope.graph
      });

      scope.$watch('set.stage', function(newVal) { //watch the whole object
        if (newVal === 1) {
          $document.scrollToElement(element, 150, 500)
          getIndependentSets();
        } else if (newVal === 2) {
          showKomplements();
        }
      });

      function getIndependentSets() {
        // remove nodes not in set
        cy.nodes().forEach(function(node) {
          if (scope.set.arr.indexOf(node.id()) === -1) {
            node.remove();
          }
        })

        // create subsets and check them for independence
        var subsets = graphHelper.createSubsets(scope.set.arr);
        var isIS, ISs = [];
        subsets.forEach(function(set) {
          isIS = true;
          for (var i = 0; i < set.length; i++) {
            if (cy.nodes('#' + set[i]).neighborhood().nodes(graphHelper.arrayToCySelection(set)).length > 0) {
              isIS = false;
            }
          };
          if (isIS) ISs.push(set);
        });

        // keep only maximal subsets
        var sizeMaxIS = 0;
        for (var j = 0; j < ISs.length; j++) {
          if (ISs[j].length > sizeMaxIS) sizeMaxIS = ISs[j].length;
        };
        for (j = 0; j < ISs.length; j++) {
          if (ISs[j].length === sizeMaxIS) scope.independentSets.push(ISs[j]);
        };
      }

      function showKomplements() {
        var kom, koms = [], colNum;
        for (var n = 0; n < scope.independentSets.length; n++) {
          kom = scope.set.arr.filter(function(el) {
            return scope.independentSets[n].indexOf(el) < 0;
          });
          koms.push(kom);
        };
        for (n = 0; n < koms.length; n++) {
          if (koms[n].length < 1) {
            colNum = 0;
          } else {
            colNum = _.findWhere(scope.subsets, {name: scope.toFlatString(koms[n])}).colorNumber;
          }
          scope.komplements.push({
            arr: koms[n],
            colorNumber: colNum
          })
        };
        // calculate color-number
        scope.set.colorNumber = _.min(scope.komplements, function(k) { return k.colorNumber; }).colorNumber + 1;
      }

      scope.toFlatString = function(arr) {
        return arr.toString().replace(/\,/g, '');
      }
      scope.toSetString = function(arr) {
        return '\\{' + arr.toString().replace(/\,/g, ', ') + '\\}';
      }
      scope.toSubgraphString = function(arr) {
        return 'G[\\{' + arr.toString().replace(/\,/g, ', ') + '\\}]';
      }
      scope.getKomplementsString = function() {
        var str = '';
        for (var i = 0; i < scope.komplements.length; i++) {
          str += scope.komplements[i].colorNumber + ', ';
        };
        return str.substring(0, str.length - 2);
      }
    }

  }

})();
