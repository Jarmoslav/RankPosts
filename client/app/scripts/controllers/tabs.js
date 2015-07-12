'use strict';

/**
* @ngdoc function
* @name rankpostsFBapp.controller:TempCtrl
* @description
* # TabsCtrl
* Controller of the rankpostsFBapp
*/
angular.module('rankpostsFBapp')
.controller('TabsCtrl', ['$scope', '$state', 'promiseTabs', function ($scope,  $state ,promiseTabs) {


  $scope.threadTitle = promiseTabs.data[0].threadID;

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
