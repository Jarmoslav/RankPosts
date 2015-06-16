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
    $scope.statistics = promiseStats.data;
    var theArrayPosts = [];
    var theArrayUserPosts = [];
    console.log(promiseStats.data.topTenImportantPostUserNames.length);
    for(var i=0; i<promiseStats.data.postsPerWeek.length; i++){
        theArrayPosts.push([new Date(promiseStats.data.postsPerWeekDates[i]), promiseStats.data.postsPerWeek[i][0]]);
    }
    for(var j=0; j< promiseStats.data.topTenImportantPostUserNames.length; j++){
        theArrayUserPosts.push([promiseStats.data.topTenImportantPostUserNames[j], promiseStats.data.topTenImportantPostUserPostCount[j][0] ]);
    }
    $scope.threadTitle = promiseStats.data.threadTitle;
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
