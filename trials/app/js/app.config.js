(function() {
  'use strict';

  angular.module('graphcoloingtests')
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        // .state('graphDirective', {
        //   url: '/graphs',
        //   templateUrl: 'js/_graph-directive.html'
        // })
    .state('other', {
          url: '/sonstiges',
          templateUrl: 'js/_sonstiges.html'
        })
        .state('greedy', {
          url: '/greedy',
          templateUrl: 'js/_greedyTest.html'
        })
        .state('greedyenumeration', {
          url: '/greedy-enumeration',
          templateUrl: 'js/_greedy_enumeration.html'
        })
        .state('lawler', {
          url: '/lawlers-algorithm',
          templateUrl: 'js/_lawler-test.html'
        })
        .state('naive', {
          url: '/naive-coloring',
          templateUrl: 'js/_naive-color-test.html'
        })
        .state('greedyslh', {
          url: '/greedyslh',
          templateUrl: 'js/_greedySLHTest.html'
        });
      $urlRouterProvider.otherwise('/greedy');
    })
    .run(['$rootScope', '$state', function($rootScope, $state) {
      $rootScope.$state = $state;
    }
  ]
);

})();
