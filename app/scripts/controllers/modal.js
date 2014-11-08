angular.module('berkantApp', ['ui.bootstrap']);


function DialogDemoCtrl($scope, $timeout, $dialog){
  $timeout(function(){
    $dialog.dialog({}).open('views/modalContent.html');
  }, 3000);
}
