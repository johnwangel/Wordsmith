/*jshint esversion:6 */
var myApp = angular.module('myApp');

myApp.controller('UsersController', [
  '$scope',
  '$routeParams',
  'UsersService',
  function($scope, $routeParams, UsersService) {
    $scope.users = [];
    return UsersService.getUsers().then(users => {
      $scope.users = users;
    });
  }
]);
