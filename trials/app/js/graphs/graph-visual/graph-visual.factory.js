(function() {
  'use strict';

  // use a factory instead of a directive, because cy.js is not just for visualisation; you need access to the graph model and events etc 
  angular.module('graphVisual').factory('graphVisualFactory', graphVisualFactory);

  graphVisualFactory.$inject = ['$q'];

  function graphVisualFactory($q) {
    var cy;
    var graphVisual = function(data) {
      var deferred = $q.defer();
      
      $(function() { // on dom ready
        
        cy = cytoscape({
          container: $('#cy')[0],
          
          style: cytoscape.stylesheet()
            .selector('node')
              .css({
                //content: 'data(id)'
               })
            .selector('edge')
              .css({
                'target-arrow-shape': 'none',
                'width': 3,
                'line-color': '#61bffc'
              })
            .selector(':selected')
              .css({
                'background-color': 'black',
                'line-color': 'black',
                'target-arrow-color': 'black',
                'source-arrow-color': 'black',
                'text-outline-color': 'black'
            }),

          layout: {
            name: 'cose',
            padding: 10
          },
          
          elements: data,

          ready: function() {
            deferred.resolve(this);
          },

          userZoomingEnabled: false
        });

      }); // on dom ready
      
      return deferred.promise;
    };
    
    graphVisual.listeners = {};
    
    function fire(e, args) {
      var listeners = graphVisual.listeners[e];
      
      for (var i = 0; listeners && i < listeners.length; i++) {
        var fn = listeners[i];
        
        fn.apply(fn, args);
      }
    }
    
    function listen(e, fn) {
      var listeners = graphVisual.listeners[e] = graphVisual.listeners[e] || [];
      
      listeners.push(fn);
    }
    
    return graphVisual;        
  }

})();
