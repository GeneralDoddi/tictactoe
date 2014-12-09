/**
 * Created by thordurth on 8.12.2014.
 */
'use strict';

angular.module('tictactoeApp')
  .controller('TictactoeGameController', function ($stateParams, $scope, $http, TicTacToeService) {

      //console.log($stateParams.id);
      TicTacToeService.setUUID($stateParams.id);
      $scope.gameJoined = TicTacToeService.getGameJoined();
      console.log($scope.gameJoined)

      $scope.processEvents = function(events){
        $scope.processedEvents = events;
        if(events[0].event === 'GameJoined'){
          console.log("GAME JOINED");
          TicTacToeService.setSecondPlayer($scope.userName);
          TicTacToeService.setPlayerSymbol(events[0].event);
          console.log(TicTacToeService.getPlayerSymbol());
          TicTacToeService.setGameName($scope.name);
          TicTacToeService.setGameJoined(true);
          $scope.gameJoined = TicTacToeService.getGameJoined();
        }
        if(events[0].event === 'MoveMade'){
          draw(events[0].move.coords, TicTacToeService.getPlayerSymbol());
        }
        else{
          //alert(events[0].event);
        }
      };

      $scope.clickbox = function(event){
        console.log(event);

       // draw((event.target.id),'O');
        console.log(TicTacToeService.getGameOwner());

        var postPromise = $http.post('/api/makeMove/',{
          id: TicTacToeService.getUUID(),
          cmd: 'MakeMove',
          user:{
            userName:TicTacToeService.getSecondPlayer()
          },
          move:{
            coords: event.target.id,
            symbol: TicTacToeService.getPlayerSymbol()
          },
          name:TicTacToeService.getGameName(),
          timeStamp: TicTacToeService.getNewDate()

        });

        postPromise.then(function(data){

          $scope.processEvents(data.data);

          console.log(data.data);
          //$scope.processEvents(data.data);
        });
      };

    $scope.joinGame = function(gameID){
      var postPromise = $http.post('/api/joinGame/',{
        id: TicTacToeService.getUUID(),
        cmd: 'JoinGame',
        user:{
          userName:TicTacToeService.getSecondPlayer()
        },
        //name:TicTacToeService.getGameName(),
        timeStamp: TicTacToeService.getNewDate()

      });

      postPromise.then(function(data){
        //console.log(data.data);
        $scope.processEvents(data.data);

      });
    };

    function draw(id, symbol){

     var c = document.getElementById(id);
     var cxt = c.getContext("2d");

      if(symbol === 'X'){
        cxt.beginPath();
        cxt.moveTo(20, 20);
        cxt.lineTo(80, 80);
        cxt.moveTo(80, 20);
        cxt.lineTo(20, 80);
        cxt.stroke();
        cxt.closePath();
      }
      else{
        cxt.beginPath();
        cxt.arc(50, 50, 40, 0, Math.PI * 2, true);
        cxt.stroke();
        cxt.closePath();
      }

    }

    $scope.updateEvents = function() {
      var getPromise = $http.get('/api/getEvents/' + TicTacToeService.getUUID());

      getPromise.then(function(data) {
        //$scope.processEvents(data.data);
        console.log(data);
      });
    };

    setInterval(function(){
      $scope.updateEvents();
    }, 2000);

  });
