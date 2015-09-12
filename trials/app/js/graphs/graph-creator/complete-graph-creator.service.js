/**
 * Creates simple graphs by
 * creating a spanning tree
 * and randomly connecting nodes
 **/
(function() {
  'use strict';

  angular.module('graphCreator').service('completeGraphCreatorService', completeGraphCreatorService);

  function completeGraphCreatorService(_) {
    /* jshint validthis: true */
    var vm = this;

    vm.create = create;

    /**
     * @param {number} numberOfNodes
     * @param {nubmber} extraConnections to control 'density' of graph
     **/
    function create(numberOfNodes) {
      var result = [],
        nodes = [], 
        edges = [], 
        i = 0,
        r1,
        r2,
        n1,
        n2;

      if (numberOfNodes < 1) return nodes;

      // create all nodes as an array of numbers
      for (i = 0; i < numberOfNodes; i++) {
        nodes.push(i);
      };

      for (var i = 0; i < nodes.length; i++) {
        for (var j = 0; j < nodes.length; j++) {
          if (nodes[i] != nodes[j]) {
            if (nodes[i] > nodes[j]) {
              edges.push([nodes[j], nodes[i]]);
            } else {
              edges.push([nodes[i], nodes[j]]);
            }
          }
        };
      };

      edges = _.uniq(edges);

      // turn nodes and edges arrays into something cytoscape can deal with
      for (i = 0; i < nodes.length; i++) {
        result.push({
          group: 'nodes',
          data: {
            id: '' + nodes[i]
          }
        });
      };

      for (i = 0; i < edges.length; i++) {
        result.push({
          group: 'edges',
          data: {
            id: edges[i][0] + '/' + edges[i][1],
            source: edges[i][0],
            target: edges[i][1]
          }
        });
      };

      return result;
    }
  }

})();
