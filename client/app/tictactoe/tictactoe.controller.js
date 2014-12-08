/**
 * Created by Þórður on 6.12.2014.
 */
'use strict';

angular.module('tictactoeApp')
  .controller('TictactoeController', function ($scope, $http, $location, TicTacToeService) {

    $scope.playGame = false;
    console.log($scope.playGame);

    $scope.processEvents = function(events){
      $scope.processedEvents = events;
      $location.path('/playgame');

    };

    $scope.createGame = function(){
      var postPromise = $http.post('/api/createGame/',{
        id:'1337',
        cmd: 'CreateGame',
        user:{
          userName:$scope.userName
        },
        name:$scope.name,
        timeStamp:'2014-01-01T03:06:00'

      });

      postPromise.then(function(data){
        console.log(data.data);
        $scope.processEvents(data.data);
        TicTacToeService.setGameOwner($scope.userName);
      });
    };

  });
