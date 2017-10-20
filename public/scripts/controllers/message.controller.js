/*jshint esversion:6 */
var myApp = angular.module('myApp');

myApp.controller('MessageController', [
  '$scope',
  '$sanitize',
  '$routeParams',
  'TopicsService',
  function($scope, $sanitize, $routeParams, TopicsService) {
    $scope.topic = [];

    $scope.createTheMessage = function() {
      let topicID = window.localStorage.getItem('topicID');
      let userID = window.localStorage.getItem('authorID');
      let message = $scope.message;
      return TopicsService.createMessage(
        topicID,
        userID,
        message
      ).then(thisMessage => {
        console.log(thisMessage);
        let messages = thisMessage.body;
        thisMessage.body = message.replace(/\r\n?|\n/g,'<br />');
        $scope.message = '';
        $scope.topic.messages.push(thisMessage);
      });
    };

    return TopicsService.getATopic($routeParams.id).then(theTopic => {
      window.localStorage.setItem('topicID', $routeParams.id);
      let messages = theTopic.messages;
      messages.forEach( (message, idx) => {
        theTopic.messages[idx].body = message.body.replace(/\r\n?|\n/g,'<br />');
      })

      $scope.topic = theTopic;
    });
  }
]);
