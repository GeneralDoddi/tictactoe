/**
 * Created by thordurth on 8.12.2014.
 */
'use strict';

angular.module('tictactoeApp')
  .controller('TictactoeGameController', function ($stateParams, $scope, $http, TicTacToeService) {

      $scope.gameGrid = ['','','','','','','','',''];

      TicTacToeService.setUUID($stateParams.id);
      $scope.gameJoined = TicTacToeService.getGameJoined();


      $scope.processEvents = function(events){

        $scope.processedEvents = events;
        if(events[0].event === 'GameJoined'){
          TicTacToeService.setPlayer($scope.userName);
          TicTacToeService.setPlayerSymbol(events[0].event);
          TicTacToeService.setGameName($scope.name);
          TicTacToeService.setGameJoined(true);
          $scope.gameJoined = TicTacToeService.getGameJoined();
        }
        if(events[0].event === 'MoveMade'){
          console.log(events);
          //$scope.gamegrid[events[0].move.coords] = TicTacToeService.getPlayerSymbol();
          TicTacToeService.draw(events[0].move.coords, TicTacToeService.getPlayerSymbol());
        }
        if(events[0].event === 'PlayerWins'){
          console.log('you win');
          TicTacToeService.draw(events[0].move.coords, TicTacToeService.getPlayerSymbol());
          clearInterval(intervalID);
        }
        else{
          console.log(events[0].event);
        }
      };

      $scope.clickbox = function(event){

        var postPromise = $http.post('/api/makeMove/',{
          id: TicTacToeService.getUUID(),
          cmd: 'MakeMove',
          user:{
            userName:TicTacToeService.getPlayer()
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

        });
      };

    $scope.joinGame = function(){
      var postPromise = $http.post('/api/joinGame/',{
        id: TicTacToeService.getUUID(),
        cmd: 'JoinGame',
        user:{
          userName: $scope.userName
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
        $scope.processPastEvents(data.data);
        //console.log(data);
      });
    };

    $scope.processPastEvents = function(data){
        $scope.processPastEvents = data;

        data.forEach(function(event){
          if(event.event === 'MoveMade'){
            //console.log('test');
            TicTacToeService.draw(event.move.coords, event.move.symbol);
          }
          if(event.event === 'PlayerWins'){
            console.log(event);
            if(event.user.userName !== TicTacToeService.getPlayer()){
              draw(event.move.coords, event.move.symbol);
              console.log('You Lose');
              clearInterval(intervalID);
            }
          }
        });

    };


    var intervalID = setInterval(function(){
      $scope.updateEvents();
    }, 2000);

  });
