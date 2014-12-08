'use strict';

angular.module('tictactoeApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider
      //.when('/playgame', '/playgame')
      .otherwise('/');

    $stateProvider.state('playgame' ,{
      url: "/playgame",
      templateUrl: 'app/tictactoe/tictactoeGame.html'
    });


    $locationProvider.html5Mode(true);
  });

