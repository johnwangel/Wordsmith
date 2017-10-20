/*jshint esversion:6 */
var myApp = angular.module('myApp');

myApp.controller('NavigationController', [
  '$rootScope',
  '$scope',
  '$location',
  'UsersService',
  function($rootScope, $scope, $location, UsersService) {

    $scope.username = window.localStorage.getItem('username') || '';

    $rootScope.$on('username', function(event, args) {
      console.log('RECEIVED EVENT');
      $scope.username = args;
    });

    $scope.loginUser = function() {
      return UsersService.loginUser(
        $scope.user.username,
        $scope.user.password
      )
      .then(thisUser => {
        window.localStorage.setItem('authorID', thisUser.id);
        window.localStorage.setItem('username', thisUser.name);
        $scope.username = thisUser.name;
        $scope.user.username = '';
        $scope.user.password = '';
        $location.path('/userHome');
      });
    }

    $scope.logoutUser = function() {
      window.localStorage.setItem('authorID', '');
      window.localStorage.setItem('username', '');
      $scope.username = '';
      $location.path('/logout');
    }

    $scope.logoutUser = function() {
      window.localStorage.setItem('authorID', '');
      window.localStorage.setItem('username', '');
      $scope.username = '';
      $location.path('/logout');
    }

    $scope.loadCreateUser = function() {
        $location.path('/newUser');
    }
  }
]);