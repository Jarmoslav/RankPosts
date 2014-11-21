'use strict';

/**
* @ngdoc overview
* @name berkantApp
* @description
* # berkantApp
*
* Main module of the application.
*/
angular
.module('berkantApp', [
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'nvd3ChartDirectives',
  'berkantApp.directive'

])
.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/:threadID', '/:threadID/bestaInlagg');

  $stateProvider
  .state('list', {
    url:'',
    templateUrl: '/views/list.html',
    resolve:{
      promiseObj:  ['$http',function($http){
        return $http.get('/json/processedThreads.json').then(function(data){

          return data;
        });
      }]
    },
    controller: ['$scope', 'promiseObj' ,function($scope, promiseObj){
      $scope.orderByField = 'threadTitle';
      $scope.reverseSort = false;

      $scope.fileNames = promiseObj.data;
    }]

  })
  .state('thread', {
    url: '/:threadID',
    templateUrl: '/views/main.html',
    resolve:{
      promiseStats:  ['$http', '$stateParams',function($http, $stateParams){
        return $http.get('/json/webstats/'+$stateParams.threadID+'-webstats.json').then(function(data){

          return data;
        });
      }]
    },
    controller: 'StatsCtrl',

  })
  .state('thread.bestPost', {
    url: '/bestaInlagg',
    templateUrl: '/views/bestPost.html',
    resolve:{
      promiseBestPost:  ['$http', '$stateParams',function($http, $stateParams){
        return $http.get('/json/posts-all/'+$stateParams.threadID+'-key-posts-all.json').then(function(data){

          return data;
        });
      }]
    },
    controller: ['$scope', 'promiseBestPost',function($scope, promiseBestPost){
      $scope.sumPostsAll = promiseBestPost.data;
      $scope.toggle = function() {
         $scope.isVisible = ! $scope.isVisible;

      };
    }]
  })
  .state('thread.bestSentence', {
    url: '/bestameningar',
    templateUrl: '/views/bestSentence.html',
    resolve:{
      promiseBestSentence:  ['$http', '$stateParams',function($http, $stateParams){
        return $http.get('/json/sentences-all/'+$stateParams.threadID+'-key-sentences-all.json').then(function(data){

          return data;
        });
      }]
    },
    controller: ['$scope', 'promiseBestSentence',function($scope, promiseBestSentence){
      $scope.sumPosts = promiseBestSentence.data;
    }]


  })
  .state('thread.bestPostTemporal', {
    url: '/bestaInlaggEfterTid',
    templateUrl: '/views/bestPostTime.html',
    resolve:{
      promiseBestPostTime:  ['$http', '$stateParams',function($http, $stateParams){

        return $http.get('/json/posts-temporal/'+$stateParams.threadID+'-key-posts-temporal.json').then(function(data){

          return data;
        });
      }]
    },
    controller: 'TempCtrl',


  })
  .state('thread.bestSentenceTemporal', {
    url: '/bestaMeningEfterTid',
    templateUrl: '/views/bestSentenceTime.html',
    resolve:{
      promiseBestPostTime:  ['$http', '$stateParams', function($http, $stateParams){
        return $http.get('/json/sentences-temporal/'+$stateParams.threadID+'-key-sentences-temporal.json').then(function(data){

          return data;
        });
      }]
    },
    controller: 'TempCtrl',
  });



});
