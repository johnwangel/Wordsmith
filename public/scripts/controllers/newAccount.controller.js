/*jshint esversion:6 */
var myApp = angular.module('myApp');

myApp.controller('NewAccountController', [
  '$rootScope',
  '$scope',
  '$location',
  'UsersService',
  function($rootScope, $scope, $location, UsersService) {
    $scope.createTheUser = function() {
      return UsersService.createUser(
        $scope.newuser.username,
        $scope.newuser.password
      ).then(thisUser => {
        window.localStorage.setItem('authorID', thisUser.id);
        window.localStorage.setItem('username', thisUser.name);
        $rootScope.$broadcast('username', thisUser.name);
        $location.path('/userHome');
      });
    };
  }
]);
