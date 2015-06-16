'use strict';

/**
 * @ngdoc function
 * @name rankpostsFBapp.controller:TempCtrl
 * @description
 * # TempCtrl
 * Controller of the rankpostsFBapp
 */
angular.module('rankpostsFBapp')
  .controller('PostInpCtrl',['$scope', 'promiseBestPostTime', function ($scope, promiseBestPostTime) {
    $scope.sumTemporals = promiseBestPostTime.data;
  }]);
