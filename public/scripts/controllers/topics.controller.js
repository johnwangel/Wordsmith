/*jshint esversion:6 */
var myApp = angular.module('myApp');

myApp.controller('TopicsController', [
  '$scope',
  '$location',
  'TopicsService',
  function($scope, $location, TopicsService) {
    $scope.topics = [];

    $scope.topic_name = '';

    $scope.createTheTopic = function() {
      let created_by = window.localStorage.getItem('authorID');
      let name = $scope.topic;
      return TopicsService.createTopic(created_by, name)
        .then(thisTopic => {
          let thisID = '/topic/' + thisTopic.id;
          console.log("THIS ID", thisID)
          $scope.topics.push(thisTopic);
          $scope.topic = '';
          $location.path(thisID);
        });
    };

    return TopicsService.getTopics().then(theTopics => {
      $scope.topics = theTopics;
    });
  }
]);
