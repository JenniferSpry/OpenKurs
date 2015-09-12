/**
 * The visualisation fpr lawlers algorithm should only take certain graphs.
 * Not random ones like greedy.
 * All graphs need to have the nodes a und b for the layout to work
 **/
(function() {
  'use strict';

  angular.module('graphs').service('exampleGraph', exampleGraph);

  function exampleGraph() {
    /* jshint validthis: true */
    var vm = this;
    vm.getGraph = getGraph;

    var graphNumer = -1;

    function getGraph() {
      graphNumer++;
      if (graphNumer >= graphs.length) graphNumer = 0;
      return graphs[graphNumer];
    }

    var graphs = [
      { 
        elements: {
          nodes: [
            { data: { id: 'a' } },
            { data: { id: 'b' } },
            { data: { id: 'c' } },
            { data: { id: 'd' } },
            { data: { id: 'e' } }
          ], 
          
          edges: [
            { data: { id: 'ac', source: 'a', target: 'c' } },
            { data: { id: 'ab', source: 'a', target: 'b' } },
            { data: { id: 'ad', source: 'a', target: 'd' } },
            { data: { id: 'bc', source: 'b', target: 'c' } },
            { data: { id: 'bd', source: 'b', target: 'd' } },
            { data: { id: 'ce', source: 'c', target: 'e' } },
            { data: { id: 'de', source: 'd', target: 'e' } }
          ]
        },
        nodes: ['a', 'b', 'c', 'd', 'e']
      },
      { 
        elements: {
          nodes: [
            { data: { id: 'a' } },
            { data: { id: 'b' } },
            { data: { id: 'c' } },
            { data: { id: 'd' } },
            { data: { id: 'e' } },
            { data: { id: 'f' } }
          ], 
          
          edges: [
            { data: { id: 'ac', source: 'a', target: 'c' } },
            { data: { id: 'ab', source: 'a', target: 'b' } },
            { data: { id: 'af', source: 'a', target: 'f' } },
            { data: { id: 'bd', source: 'b', target: 'd' } },
            { data: { id: 'cd', source: 'c', target: 'd' } },
            { data: { id: 'ce', source: 'c', target: 'e' } },
            { data: { id: 'de', source: 'd', target: 'e' } },
            { data: { id: 'df', source: 'd', target: 'f' } }
          ]
        },
        nodes: ['a', 'b', 'c', 'd', 'e']
      }, 
      { 
        elements: {
          nodes: [
            { data: { id: 'a' } },
            { data: { id: 'b' } },
            { data: { id: 'c' } },
            { data: { id: 'd' } },
            { data: { id: 'e' } }
          ], 
          
          edges: [
            { data: { id: 'ab', source: 'a', target: 'b' } },
            { data: { id: 'ad', source: 'a', target: 'd' } },
            { data: { id: 'bc', source: 'b', target: 'c' } },
            { data: { id: 'bd', source: 'b', target: 'd' } },
            { data: { id: 'ce', source: 'c', target: 'e' } },
            { data: { id: 'de', source: 'd', target: 'e' } }
          ]
        },
        nodes: ['a', 'b', 'c', 'd', 'e']
      },
      { 
        elements: {
          nodes: [
            { data: { id: 'a' } },
            { data: { id: 'b' } },
            { data: { id: 'c' } }
          ], 
          
          edges: [
            { data: { id: 'ac', source: 'a', target: 'c' } },
            { data: { id: 'ab', source: 'a', target: 'b' } },
            { data: { id: 'bc', source: 'b', target: 'c' } }
          ]
        },
        nodes: ['a', 'b', 'c']
      }
    ];
    
  }

})();
