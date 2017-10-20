/*jshint esversion:6 */
angular.module('myApp').service('TopicsService', [
  '$http',
  function($http) {
    function getTopics() {
      return $http({ method: 'GET', url: '/api/topics/' }).then(allTopics => {
        console.log(allTopics);
        return allTopics.data;
      });
    }

    function createTopic(created_by, name) {
      return $http({
        method: 'POST',
        url: '/api/topics',
        data: { created_by: created_by, name: name }
      }).then(newTopic => {
        console.log('new topic', newTopic);
        return newTopic.data;
      });
    }

    function getATopic(id) {
      return $http({
        method: 'GET',
        url: `/api/messages/by-topic/${id}`
      }).then(theTopic => {
        console.log(theTopic);
        return theTopic.data;
      });
    }

    function createMessage(topicid, authorid, message) {
      return $http({
        method: 'POST',
        url: '/api/messages/',
        data: { body: message, author_id: authorid, topic_id: topicid }
      }).then(theTopic => {
        return theTopic.data;
      });
    }

    function getLatestMessages() {
      return $http({
        method: 'GET',
        url: '/api/messages/latest'
      }).then(tenPosts => {
        return tenPosts.data;
      });
    }

    return {
      getTopics: getTopics,
      createTopic: createTopic,
      getATopic: getATopic,
      createMessage: createMessage,
      getLatestMessages: getLatestMessages
    };
  }
]);
