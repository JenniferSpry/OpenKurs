(function() {
  'use strict';

  angular.module('kursapp', [
    'templates',
    'ui.router',
    'ngAnimate',
    'viewhead',
    'toaster',
    'headroom',
    'ui.bootstrap.transition',
    'ui.bootstrap.collapse',
    'angular-loading-bar',
    'admin',
    'course',
    'nav',
    'authmodule',
    'Devise'
  ]).run(function($rootScope) {
    $rootScope.menuVisible = true;
  });

})();
