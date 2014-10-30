'use strict';

/**
 * @ngdoc function
 * @name berkantApp.controller:StatsCtrl
 * @description
 * # StatsCtrl
 * Controller of the berkantApp
 */
angular.module('berkantApp')
  .controller('StatsCtrl', [ '$scope', 'promiseStats', function ($scope, promiseStats) {


    $scope.statistics = promiseStats.data;

    var theArrayPosts = [];
    var theArrayUserPosts = [];

    for(var i=0; i<promiseStats.data.postsPerDay.length; i++){
        theArrayPosts.push([new Date(promiseStats.data.postsPerDayDates[i]), promiseStats.data.postsPerDay[i][0]]);
    }
    for(var j=0; j< promiseStats.data.topTenUserPostCounts.length; j++){
        theArrayUserPosts.push([promiseStats.data.topTenUserNames[j], promiseStats.data.topTenUserPostCounts[j]]);
    }

    $scope.threadTitle = promiseStats.data.threadTitle;

    $scope.postPerDay = [{
              'key': 'Post per day',
              'values': theArrayPosts
               }];

            $scope.postsPerUser =[{
              'key': 'Post per User',
              'values': theArrayUserPosts
            }];

   $scope.toggle = function() {
      $scope.isVisible = ! $scope.isVisible;

  };


    $scope.xAxisTickFormat = function(){
          return function(d){
            //return d3.time.format('%X')(new Date(d));  //uncomment for time format
            return d3.time.format('%x')(new Date(d));  //uncomment for date format
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
