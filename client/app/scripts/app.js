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
  'rankpostsFBapp.directive',
    'angucomplete-alt'


])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('/flashback/:threadID', '/flashback/:threadID/post');


  $stateProvider
  .state('start', {
    url: '', //remove the ones, easy fix
    templateUrl: 'views/start.html'
  })
  .state('flashback', {
    url:'/flashback',
      views: {
        'searchThreads': {
          templateUrl: 'views/threadSearch.html',
          controller: ['$scope', '$state', function($scope, $state){
            $scope.threadSelected = function (thread) {
              $state.go('thread', {threadID: thread.description.threadID});
            };
          }],
        },
        'list': {
          templateUrl: 'views/list.html',
          resolve:{
            promiseObj:  ['$http',function($http){
              return $http.get('threads').then(function(object){
                return object.data;
              });
            }]
          },
          controller: ['$scope', 'promiseObj' ,function($scope, promiseObj){
            $scope.orderByField = 'threadTitle';
            $scope.reverseSort = false;
            $scope.threads = promiseObj;
          }]
        }
      }
  })
  .state('about', {
    url: '/about/', //remove the ones, easy fix
    templateUrl: 'views/about.html',
    controller: ['$scope', function($scope){
      $scope.title = 'about';
    }]
  })
    .state('thread', {
      url: '/flashback/:threadID',
      templateUrl: 'views/main.html',
      resolve:{
        promiseTabs:  ['$http', '$stateParams',function($http, $stateParams){
          return $http.get('threads/posts?threadID='+$stateParams.threadID).then(function(data){
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
        promiseBestTextObject:  ['$http', '$stateParams',function($http, $stateParams){
          return $http.get('threads/posts?threadID='+$stateParams.threadID).then(function(data){
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
          return $http.get('threads/sentences?threadID='+$stateParams.threadID).then(function(data){
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
          return $http.get('threads/stats?threadID='+$stateParams.threadID).then(function(statistics){
            return statistics;
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
  }]);
