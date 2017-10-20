/*jshint esversion:6 */
var myApp = angular.module('myApp');

myApp.controller('LatestController', [
  '$scope',
  'TopicsService',
  function($scope, TopicsService) {
    return TopicsService.getLatestMessages().then(latestPosts => {
      latestPosts.forEach( (message, idx) => {
        latestPosts[idx].body = message.body.replace(/\r\n?|\n/g,'<br />');
      })
      $scope.latest = latestPosts;
    });
  }
]);
