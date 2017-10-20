// creation uses a 2nd array argument to import dependencies
angular.module('myApp', ['ngRoute', 'ngSanitize']);

// retrieval has only one argument
var myApp = angular.module('myApp');

myApp
  .config([
    '$routeProvider',
    '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'latest.html',
          controller: 'LatestController'
        })
        .when('/users', {
          templateUrl: 'users.html',
          controller: 'UsersController'
        })
        .when('/userHome', {
          templateUrl: 'userHome.html',
          controller: 'MainHomeController'
        })
        .when('/login', {
          templateUrl: 'login.html',
          controller: 'NavigationController'
        })
        .when('/logout', {
          templateUrl: 'logout.html',
          controller: 'MainHomeController'
        })
        .when('/newUser', {
          templateUrl: 'newUser.html',
          controller: 'MainHomeController'
        })
        .when('/topic/create', {
          templateUrl: 'topic.html',
          controller: 'MessageController'
        })
        .when('/topic/:id', {
          templateUrl: 'topic.html',
          controller: 'MessageController'
        })
        .when('/user/:id', {
          templateUrl: 'userHome.html',
          controller: 'UserHomeController'
        })
        .when('/latest', {
          templateUrl: 'latest.html',
          controller: 'LatestController'
        })
        .otherwise({ redirectTo: '/' });
      $locationProvider.html5Mode(true);
    }
  ])
  .run([
    '$rootScope',
    'APP_VERSION',
    function($rootScope, APP_VERSION) {
      console.log('running');
      $rootScope.version = APP_VERSION;
    }
  ]);
