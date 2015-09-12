/**
 * Converts graph information into something cytoscape can read
 **/
(function() {
  'use strict';

  angular.module('graphCreator').service('graphInterpreterService', graphInterpreterService);

  function graphInterpreterService(_) {
    /* jshint validthis: true */
    var vm = this;

    vm.interpret = interpret;

    /**
     * @param {Array} nodes
     * @param {Array} edges
     **/
    function interpret(nodes, edges) {
      var result = [];

      // turn nodes and edges arrays into something cytoscape can deal with
      for (var i = 0; i < nodes.length; i++) {
        if (Array.isArray(nodes[i])) {
          result.push({
            group: 'nodes',
            data: {
              id: '' + nodes[i][0],
              layer: nodes[i][1]
            }
          });
        } else {
          result.push({
            group: 'nodes',
            data: {
              id: '' + nodes[i]
            }
          });
        }
      };

      for (var j = 0; j < edges.length; j++) {
        if (edges[j].length === 3) {
          result.push({
            group: 'edges',
            data: {
              id: 'e' + j,
              source: edges[j][0],
              target: edges[j][1],
              weight: edges[j][2]
            }
          });
        } else {
          result.push({
            group: 'edges',
            data: {
              id: 'e' + j,
              source: edges[j][0],
              target: edges[j][1]
            }
          });
        }
      };

      return result;
    }
  }

})();
