'use strict';

/**
* @ngdoc function
* @name rankpostsFBapp.controller:TempCtrl
* @description
* # TabsCtrl
* Controller of the rankpostsFBapp
*/
angular.module('rankpostsFBapp')
.controller('TabsCtrl', ['$scope','$http', '$state', 'promiseTabs', function ($scope,$http,  $state ,promiseTabs) {


    //refacorera
    $http({
      url: 'threads/threadName',
      method: 'GET',
      params: {threadID: promiseTabs.data[0].threadID}
    }).success(function(data) {
      $scope.threadTitle = data.threadTitle;
          // this callback will be called asynchronously // when the response is available
    }).error(function(data, status, headers, config) {
          // called asynchronously if an error occurs // or server returns response with an error status. });;
    });



  $scope.tabs = [
   {heading: 'Inlägg', route:'thread.posts', active:true},
   {heading: 'Meningar', route:'thread.sentences', active:false },
   {heading: 'Statistik', route:'thread.stats', active:false },
  ];


  $scope.go = function(route){
    $state.go(route);
  };

  $scope.active = function(route){
    return $state.is(route);
  };

  $scope.$on('$stateChangeSuccess', function() {
    $scope.tabs.forEach(function(tab) {
      tab.active = $scope.active(tab.route);
    });
  });



}]);
