/*jshint esversion:6 */
var myApp = angular.module('myApp');

myApp.controller('MainHomeController', [
  '$scope',
  '$filter',
  'UsersService',
  function($scope, $filter, UsersService) {
    $scope.userData = [];

    return UsersService.getUserHome(
      window.localStorage.getItem('authorID')
    ).then(userData => {

      let messages = userData.messages;
      messages.forEach( (message, idx) => {
        userData.messages[idx].body = message.body.replace(/\r\n?|\n/g,'<br />');
      })

      $filter('orderBy')(userData.messages, 'createdAt');
      $scope.userData = userData;
    });
  }
]);
