'use strict';

/**
* @ngdoc function
* @name rankpostsFBapp.controller:Best
* @description
* # TempCtrl
* Controller of the rankpostsFBapp
*/

angular.module('rankpostsFBapp')
.controller('PostCtrl',['$scope', '$location','$anchorScroll', 'promiseBestTextObject', function ($scope, $location, $anchorScroll, promiseBestTextObject) {

  $scope.sumPostsAll = promiseBestTextObject.data;

  $scope.$on('data-resolved', function(event, args ){
      console.log('data-resolved');
      console.log(args);
  });

  $scope.scrollTo = function(id) {
    $location.hash(id);
    $anchorScroll();
  };

}]);

angular.module('rankpostsFBapp').filter('ellipsis', [ '$sce',function ($sce) {
  /** return function (sentence, length) {  TOG BORT LENGTH DÅ DEN INTE VERKADE ANVÄNDAS*/
  return function (sentence,length) {
    return $sce.trustAsHtml(sentence.substr(0, length)+' ... <br> <i style="color:#4285F4">Klicka för mer.</i>');
  };
}]);
