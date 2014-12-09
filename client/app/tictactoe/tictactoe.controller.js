/**
 * Created by Þórður on 6.12.2014.
 */
'use strict';

angular.module('tictactoeApp')
  .controller('TictactoeController', function ($state, $scope, $http, $location, TicTacToeService) {

    $scope.playGame = false;

    /* jshint ignore:start */
    $scope.id = generateUUID();
    /* jshint ignore:end */

    //console.log($scope.playGame);

    $scope.processEvents = function(events){
      $scope.processedEvents = events;
      if(events[0].event === 'GameCreated'){
        TicTacToeService.setGameOwner($scope.userName);
        TicTacToeService.setPlayerSymbol(events[0].event);
        console.log(TicTacToeService.getPlayerSymbol());
        TicTacToeService.setGameJoined(true);
        TicTacToeService.setGameName($scope.name);
        $state.go('playgame/:id', {id: events[0].id});
      }
    };

    $scope.createGame = function(){

      var postPromise = $http.post('/api/createGame/',{
        id: $scope.id,
        cmd: 'CreateGame',
        user:{
          userName:$scope.userName
        },
        name:$scope.name,
        timeStamp: TicTacToeService.getNewDate()

      });


      postPromise.then(function(data){
        $scope.processEvents(data.data);

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
