/*jshint esversion:6 */
var myApp = angular.module('myApp');

myApp.controller('UserHomeController', [
  '$scope',
  '$routeParams',
  '$filter',
  'UsersService',
  function($scope, $routeParams, $filter, UsersService) {
    $scope.userData = [];

    return UsersService.getUserHome($routeParams.id)
      .then(userData => {

        let messages = userData.messages;
        messages.forEach( (message, idx) => {
          userData.messages[idx].body = message.body.replace(/\r\n?|\n/g,'<br />');
        })

        $filter('orderBy')(userData.messages, 'createdAt');
        $scope.userData = userData;
      });
  }
]);
