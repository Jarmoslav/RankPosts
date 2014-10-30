'use strict';

/**
 * @ngdoc function
 * @name berkantApp.controller:TempCtrl
 * @description
 * # TempCtrl
 * Controller of the berkantApp
 */
angular.module('berkantApp')
  .controller('TempCtrl',['$scope', 'promiseBestPostTime', function ($scope, promiseBestPostTime) {
    $scope.test = 'hee';
    console.log('promiseStats');
    //console.log(promiseBestPostTime.data);
    $scope.sumTemporals = promiseBestPostTime.data;

  }]);
