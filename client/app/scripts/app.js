'use strict';

/**
* @ngdoc overview*
 * @author Simon Jare*
* @name rankpostsFBapp
* @description
* # rankpostsFBapp
*
* Main module of the application.
*/
angular
.module('rankpostsFBapp', [
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'nvd3ChartDirectives',
  'rankpostsFBapp.directive'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('/flashback/:threadID', '/flashback/:threadID/post');


  $stateProvider
  .state('start', {
    url: '', //remove the ones, easy fix
    templateUrl: 'views/start.html'
  })
  .state('flashback', {
    url:'flashback',
    templateUrl: 'views/list.html',
    resolve:{
      promiseObj:  ['$http',function($http){
        return $http.get('json/processedThreads.json').then(function(data){
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
  .state('about', {
    url: '/about/', //remove the ones, easy fix
    templateUrl: 'views/about.html',
    controller: function($scope){
      $scope.title = 'about';
    }
  })
  .state('thread', {
    url: '/flashback/:threadID',
    templateUrl: 'views/main.html',
    resolve:{
      promiseStats:  ['$http', '$stateParams',function($http, $stateParams){
        return $http.get('json/webstats/'+$stateParams.threadID+'-webstats.json').then(function(data){
          return data;
        });
      }]
    },
    controller: 'TabsCtrl',
  })

  .state('thread.posts', {
    url: '/post',
    templateUrl: 'views/postview.html',
    resolve:{
      promiseBestTextObject:  ['$http', '$stateParams', '$rootScope',function($http, $stateParams, $rootScope){
            console.log($stateParams.threadID);
        return $http.get('json/posts-all/'+$stateParams.threadID+'-key-posts-all.json').then(function(data){

          return data;
        });
      }]
    },
    controller: 'PostCtrl',
  })

  .state('thread.sentences', {
    url: '/sent',
    templateUrl: 'views/sentview.html',
    resolve:{
      promiseBestTextObject:  ['$http', '$stateParams',function($http, $stateParams){
        return $http.get('json/sentences-all/'+$stateParams.threadID+'-key-sentences-all.json').then(function(data){
          return data;
        });
      }]
    },
    controller: 'PostCtrl',
  })
  .state('thread.stats', {
    url: '/stats',
    templateUrl: 'views/statsview.html',
    resolve:{
      promiseStats:  ['$http', '$stateParams',function($http, $stateParams){
        return $http.get('json/webstats/'+$stateParams.threadID+'-webstats.json').then(function(data){
          return data;
        });
      }]
    },
    controller: 'StatsCtrl',
  });

}).run(['$rootScope', '$location', '$window', function($rootScope, $location, $window){
  $rootScope
          .$on('$stateChangeSuccess',
		  function(event){
		    if (!$window.ga)
		      return;

		      $window.ga('send', 'pageview', { page: $location.path() });
		  });
  }]);;
