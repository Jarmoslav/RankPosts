'use strict';

/**
* @ngdoc function
* @name rankpostsFBapp.controller:TempCtrl
* @description
* # TabsCtrl
* Controller of the rankpostsFBapp
*/
angular.module('rankpostsFBapp')
.controller('TabsCtrl', ['$scope', '$state', 'promiseStats', function ($scope,  $state ,promiseStats) {

  $scope.threadTitle = promiseStats.data.threadTitle;

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
    console.log($state);
    $scope.tabs.forEach(function(tab) {
      tab.active = $scope.active(tab.route);
    });
  });

  $scope.$on('$stateChangeStart', function() {
    console.log("start");
  });


}]);
