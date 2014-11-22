'use strict';

/**
* @ngdoc function
* @name berkantApp.controller:Best
* @description
* # TempCtrl
* Controller of the berkantApp
*/
angular.module('berkantApp')
.controller('BestCtrl',['$scope', 'promiseBestTextObject', function ($scope, promiseBestTextObject) {
  $scope.sumPostsAll = promiseBestTextObject.data;
}]);



angular.module('berkantApp').filter('ellipsis', [ '$sce',function ($sce) {
  return function (sentence, length) {
    //console.log('sss');

    return $sce.trustAsHtml(sentence.substr(0, 500));
  }
}]);
