(function() {
  'use strict';

  angular.module('bipartiteGraphExample').controller('BipartiteGraphExampleCtrl', BipartiteGraphExampleCtrl);
  
  function BipartiteGraphExampleCtrl($scope, graphVisualFactory, graphCreatorService) {
    var cy; // maybe you want a ref to cy
    // (usually better to have the srv as intermediary)

    $scope.addNode = function() {
      console.log('ffo');
    };

    var graph = graphCreatorService.createBipartiteGraph(5, 8, 5);
    
    // you would probably want some ui to prevent use of Ctrl until cy is loaded
    graphVisualFactory(graph).then(function() {      
      // use this variable to hide ui until cy loaded if you want
      $scope.cyLoaded = true;
    });
   
  }

})();
