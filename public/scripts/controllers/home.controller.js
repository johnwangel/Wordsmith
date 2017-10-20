var myApp = angular.module('myApp');

myApp.controller('HomeController', [
  '$scope',
  function($scope) {
    $scope.myName = 'John Atkins';
  }
]);
