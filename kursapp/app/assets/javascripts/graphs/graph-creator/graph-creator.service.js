(function() {
  'use strict';

  angular.module('graphCreator').service('graphCreatorService', graphCreatorService);

  function graphCreatorService(_) {
    /* jshint validthis: true */
    var vm = this;

    vm.createBipartiteGraph = createBipartiteGraph;

    // will NOT work for large node numbers
    // see edgeStrings[i].slice(0, 2)
    // what if this is a non single digit number?
    function createBipartiteGraph(numLeftNodes, numRightNodes, extraConnections) {
      var leftEles = [], rightEles = [], edges = [], edgeStrings = [], i = 0, n = 0, m = 0;

      if (numLeftNodes < 1 || numRightNodes < 1) return leftEles;

      // make sure the left nodes are the bigger partiton (or same size)
      if (numRightNodes > numLeftNodes) {
        var tmp = numLeftNodes;
        numLeftNodes = numRightNodes;
        numRightNodes = tmp;
      }

      // create all nodes
      leftEles = makeNodeArray(numLeftNodes, 'l');
      rightEles = makeNodeArray(numRightNodes, 'r');

      // connect nodes
      // create array of strings to make sure there is only one of each edge
      for (i = 0; i < numLeftNodes; i++) {
        if (numRightNodes <= i) {
          n = getRandomInt(0, numRightNodes - 1);
        } else {
          n = i;
        }
        edgeStrings.push('l' + i + 'r' + n);
      }

      // add extra connections
      while (edgeStrings.length < numLeftNodes + extraConnections) {
        n = getRandomInt(0, numLeftNodes - 1);
        m = getRandomInt(0, numRightNodes - 1);
        
        edgeStrings.push('l' + n + 'r' + m);

        edgeStrings = _.uniq(edgeStrings);
      }

      // create edges from strings
      for (i = 0; i < edgeStrings.length; i++) {
        edges.push({
          group: 'edges',
          data: {
            id: 'e' + i,
            source: edgeStrings[i].slice(0, 2),
            target: edgeStrings[i].slice(2, 4)
          }
        });
      }

      return _.union(leftEles, rightEles, edges);
    }
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function makeNodeArray(numberOfNodes, idPrefix) {
    var result = [];
    for (var i = 0; i < numberOfNodes; i++) {
      result.push({
        group: 'nodes',
        data: {
          id: idPrefix + i
        }
      });
    }
    return result;
  }

})();
