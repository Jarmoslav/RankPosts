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
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
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
    templateUrl: 'views/list.html',
    resolve:{
      promiseObj:  function($http){
        return $http.get('json/processedThreads.json').then(function(data){

          return data;
        });
      }
    },
    controller: function($scope, promiseObj){
      $scope.orderByField = 'threadTitle';
      $scope.reverseSort = false;

      $scope.fileNames = promiseObj.data;
    }

  })
  .state('thread', {
    url: '/:threadID',
    templateUrl: 'views/main.html',
    resolve:{
      promiseStats:  function($http, $stateParams){
        return $http.get('json/webstats/'+$stateParams.threadID+'-webstats.json').then(function(data){
               
          return data;
        });
      }
    },
    controller: 'StatsCtrl',

  })
  .state('thread.bestPost', {
    url: '/bestaInlagg',
    templateUrl: 'views/bestPost.html',
    resolve:{
      promiseBestPost:  function($http, $stateParams){
        return $http.get('json/posts-all/'+$stateParams.threadID+'-key-posts-all.json').then(function(data){
          console.log('data');
          return data;
        });
      }
    },
    controller: function($scope, promiseBestPost){
      $scope.sumPostsAll = promiseBestPost.data;
    }
  })
  .state('thread.bestSentence', {
    url: '/bestameningar',
    templateUrl: 'views/bestSentence.html',
    resolve:{
      promiseBestSentence:  function($http, $stateParams){
        return $http.get('json/sentences-all/'+$stateParams.threadID+'-key-sentences-all.json').then(function(data){
          console.log('data');
          return data;
        });
      }
    },
    controller: function($scope, promiseBestSentence){
      console.log(promiseBestSentence);
      $scope.sumPosts = promiseBestSentence.data;
    }


  })
  .state('thread.bestPostTemporal', {
    url: '/bestaInlaggEfterTid',
    templateUrl: 'views/bestSentenceTime.html',
    resolve:{
      promiseBestPostTime:  function($http, $stateParams){
        return $http.get('json/sentences-temporal/'+$stateParams.threadID+'-key-sentences-temporal.json').then(function(data){
          console.log('data');
          console.log(data);
          return data;
        });
      }
    },
    controller: 'TempCtrl',


  });



});
