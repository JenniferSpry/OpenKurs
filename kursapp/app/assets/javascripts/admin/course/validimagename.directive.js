(function() {
  'use strict';

  var IMAGE_REGEXP = /\.(gif|jpg|jpeg|tiff|tif|png)$/i;

  angular.module('admin.course').directive('validImageName', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.image = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }

        if (IMAGE_REGEXP.test(viewValue)) {
          // it is valid
          return true;
        }

        // it is invalid
        return false;
      };
    }
  };
});
})();
