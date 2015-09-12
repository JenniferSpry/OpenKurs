/**
 * collection of helper functions
 **/
(function() {
  'use strict';

  angular.module('graphs').service('graphHelper', graphHelper);

  function graphHelper(_) {
    /* jshint validthis: true */
    var vm = this;

    vm.permute = permute;
    vm.getSmallestNumNotInArray = getSmallestNumNotInArray;
    vm.createSubsets = createSubsets;
    vm.getRandomInt = getRandomInt;
    vm.arrayToCySelection = arrayToCySelection;

    /**
     * git this from:
     * http://stackoverflow.com/questions/9960908/permutations-in-javascript
     * get all possible permutations of an input arra<
     */
    function permute(input) {
      var permArr = [], usedChars = [];

      function perm(input) {
        var ch;
        
        for (var i = 0; i < input.length; i++) {
          ch = input.splice(i, 1)[0];
          usedChars.push(ch);
          if (input.length == 0) {
            permArr.push(usedChars.slice());
          }
          perm(input);
          input.splice(i, 0, ch);
          usedChars.pop();
        }
        return permArr;
      }

      return perm(input);
    }

    function getSmallestNumNotInArray(arr) {
      if (arr.length === 0) return 0;
      // duplikate entfernen
      arr = arr.filter(function(item, pos) {
        return arr.indexOf(item) == pos;
      });
      // sort array
      arr.sort(function(a, b) {return a - b;});
      var n = 0;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== n) {
          return n;
        } else {
          n++;
        }
      }
      return n;
    }

    /**
     * Takes an array and returns an array of all possible subsets of the input array
     * (power set)
     */
    function createSubsets(arr) {
      var result = [], firstSet = [], set = [], i, j, m;
      
      if (arr.length === 0) return result;

      arr = arr.sort();

      // pepare first
      for (i = 0; i < arr.length; i++) {
        firstSet.push([arr[i]]);
      }
      result.push(firstSet);

      for (j = 1; j < arr.length; j++) { // for every set size from 2 to n
        result[j] = [];
        result[j - 1].forEach(function(ele) {
          for (m = 0; m < arr.length; m++) {
            set = angular.copy(ele);
            set.push(arr[m]);
            // trow out sets like [a, a]
            set = _.uniq(set);
            set.sort();
            if (set.length === (j + 1)) {
              result[j].push(set);
            }
          }
        });
        result[j] = _.uniq(result[j], function(s) {
          return s.toString();
        });
      }
      return _.flatten(result, true);
    }

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Take an array like ['a', 'b'] and returns the string ' #a, #b'
     */
    function arrayToCySelection(arr) {
      arr = _.map(arr, function(el) {
        return '#' + el;
      })
      return arr.toString();
    }
    
  }

})();
