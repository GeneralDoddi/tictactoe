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
      var id = generateUUID();
      var postPromise = $http.post('/api/createGame/',{
        id: id,
        cmd: 'CreateGame',
        user:{
          userName:$scope.userName
        },
        name:$scope.name,
        timeStamp: new Date()

      });


      postPromise.then(function(data){
        console.log(data);
        if(data.data[0].event === 'GameCreated'){
          $scope.processEvents(data.data);
          TicTacToeService.setGameOwner($scope.userName);
          TicTacToeService.setPlayerSymbol(data.data[0].event);
          console.log(TicTacToeService.getPlayerSymbol());
        }
      });
    };

    $scope.joinGame = function(gameID){
      var postPromise = $http.post('/api/joinGame/',{
        id: gameID,
        cmd: 'JoinGame',
        user:{
          userName:$scope.userName
        },
        timeStamp: new Date()

      });

      postPromise.then(function(data){
        console.log(data.data);
        $scope.processEvents(data.data);
        TicTacToeService.setGameOwner($scope.userName);
        TicTacToeService.setPlayerSymbol(data.data.event);
      });
    };

    /* jshint ignore:start */
    // code found on http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    function generateUUID(){
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
      });
      return uuid;
    }
    /* jshint ignore:end */

  });
