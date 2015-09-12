/**
 * Creates simple graphs by
 * creating a spanning tree
 * and randomly connecting nodes
 **/
(function() {
  'use strict';

  angular.module('graphCreator').service('simpleGraphCreatorService', simpleGraphCreatorService);

  function simpleGraphCreatorService(_) {
    /* jshint validthis: true */
    var vm = this;

    vm.create = create;

    /**
     * @param {number} numberOfNodes
     * @param {nubmber} extraConnections to control 'density' of graph
     **/
    function create(numberOfNodes, extraConnections) {
      var result = [], 
        connectedNodes = [], 
        notConnectedNodes = [], 
        edges = [], 
        i = 0,
        r1,
        r2,
        n1,
        n2;

      if (numberOfNodes < 1) return connectedNodes;

      // create all nodes as an array of numbers
      for (i = 0; i < numberOfNodes; i++) {
        notConnectedNodes.push(i + 1);
      };

      // connect nodes (edges is an array of arrays like [[node1, node2], [node3, node7], ...])
      while (notConnectedNodes.length > 0) {
      // take random unconnected node
        r1 = getRandomInt(0, notConnectedNodes.length - 1);
        n1 = notConnectedNodes[r1];
        if (connectedNodes.length > 0) {
          r2 = getRandomInt(0, connectedNodes.length - 1);
          n2 = connectedNodes[r2];
          if (n2 > n1) {
            edges.push([n1, n2]);
          } else {
            edges.push([n2, n1]);
          }
        }
        connectedNodes.push(n1);
        notConnectedNodes.splice(r1, 1);
      }

      // add some connections so this is not just a tree
      for (i = 1; i < extraConnections; i++) {
        r1 = getRandomInt(0, connectedNodes.length - 1);
        r2 = getRandomInt(0, connectedNodes.length - 1);
        if (r1 != r2) {
          n1 = connectedNodes[r1];
          n2 = connectedNodes[r2];
          if (n2 > n1) {
            edges.push([n1, n2]);
          } else {
            edges.push([n2, n1]);
          }
        }
      };

      edges = _.uniq(edges);

      // turn nodes and edges arrays into something cytoscape can deal with
      for (i = 0; i < connectedNodes.length; i++) {
        result.push({
          group: 'nodes',
          data: {
            id: '' + connectedNodes[i]
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

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

})();
