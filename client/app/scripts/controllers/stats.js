'use strict';

/**
 * @ngdoc function
 * @name rankpostsFBapp.controller:StatsCtrl
 * @description
 * # StatsCtrl
 * Controller of the rankpostsFBapp
 */

angular.module('rankpostsFBapp')
  .controller('StatsCtrl', [ '$scope', 'promiseStats', function ($scope, promiseStats) {
    $scope.statistics = promiseStats.data[0];
    console.log(promiseStats.data[0]);
    var theArrayPosts = [];
    var theArrayUserPosts = [];
    var statistics = promiseStats.data[0];

    for(var i=0; i<statistics.postsPerWeek.length; i++){
        theArrayPosts.push([new Date(statistics.postsPerWeekDates[i]), statistics.postsPerWeek[i][0]]);
    }
    for(var j=0; j< statistics.topTenImportantPostUserNames.length; j++){
        theArrayUserPosts.push([statistics.topTenImportantPostUserNames[j], statistics.topTenImportantPostUserPostCount[j]]);
    }
    $scope.threadTitle = statistics.threadTitle;
    $scope.postsPerWeek = [{
      'key': 'Inlägg per vecka',
      'values': theArrayPosts
      }];

    $scope.postsPerUser = [{
      'key': 'Posts per User',
      'values': theArrayUserPosts
      }];
    $scope.toggle = function() {
      $scope.isVisible = ! $scope.isVisible;
    };
    $scope.xAxisTickFormat = function(){
      return function(d){
        var theFormat =  d3.time.format('%x');
        return theFormat(new Date(d));  //uncomment for date format
        };
      };
    $scope.yAxisTickFormatFunction = function() {
      return function(d){
        return d;
        };
      };
    $scope.xAxisTickFormatFunction = function() {
      return function(d){
        return d;
        };
      };

  }]);
