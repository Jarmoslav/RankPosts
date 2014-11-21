'use strict';

/**
 * @ngdoc function
 * @name berkantApp.controller:TempCtrl
 * @description
 * # TempCtrl
 * Controller of the berkantApp
 */
angular.module('berkantApp')
  .controller('TempCtrl',['$scope', 'promiseBestPostTime', 'promiseBestPostTimeMoreInfo', function ($scope, promiseBestPostTime, promiseBestPostTimeMoreInfo) {
    $scope.sumTemporals = promiseBestPostTime.data;
    $scope.sumTemporalsMoreInfo = promiseBestPostTimeMoreInfo.data;

  }]);
