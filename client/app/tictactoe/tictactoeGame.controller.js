/**
 * Created by thordurth on 8.12.2014.
 */
'use strict';

angular.module('tictactoeApp')
  .controller('TictactoeGameController', function ($interval,$stateParams, $scope, $http, TicTacToeService) {

      TicTacToeService.setUUID($stateParams.id);
      $scope.gameJoined = TicTacToeService.getGameJoined();
      $scope.playerOneName = '';
      $scope.playerTwoName = '';
      $scope.gameOver = false;


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
          //console.log(events);
          //$scope.gamegrid[events[0].move.coords] = TicTacToeService.getPlayerSymbol();
          TicTacToeService.draw(events[0].move.coords, TicTacToeService.getPlayerSymbol());
        }
        if(events[0].event === 'PlayerWins'){
          //console.log('you win');
          TicTacToeService.draw(events[0].move.coords, TicTacToeService.getPlayerSymbol());
          //$interval.cancel(intervalID);
        }
        else{
          //console.log(events[0].event);
        }
      };

      $scope.clickbox = function(event){
        if(!$scope.gameOver){

          var postPromise = $http.post('/api/makeMove/',{
            id: TicTacToeService.getUUID(),
            cmd: 'MakeMove',
            user:{
              userName:TicTacToeService.getPlayer()
            },
            move:{
              coords: event.target.dataset.value,
              symbol: TicTacToeService.getPlayerSymbol()
            },
            name:TicTacToeService.getGameName(),
            timeStamp: TicTacToeService.getNewDate()

          });

          postPromise.then(function(data){

            $scope.processEvents(data.data);

          });
        }
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


    $scope.updateEvents = function() {
      var getPromise = $http.get('/api/getEvents/' + TicTacToeService.getUUID());

      getPromise.then(function(data) {
        //console.log(data);
        $scope.processPastEvents(data.data);
        //console.log(data);
      });
    };

    $scope.processPastEvents = function(data){
        $scope.processedPastEvents = data;

        data.forEach(function(event){
          if(event.event === 'GameCreated'){
            $scope.playerOneName = event.user.userName;
          }
          if(event.event === 'GameJoined'){
            $scope.playerTwoName = event.user.userName;
          }
          if(event.event === 'MoveMade'){
            //console.log('test');
            TicTacToeService.draw(event.move.coords, event.move.symbol);
          }
          if(event.event === 'PlayerWins'){
            $scope.endGameMessage = event.user.userName + " wins";
            $scope.gameOver = true;
            if(event.user.userName !== TicTacToeService.getPlayer()){
              TicTacToeService.draw(event.move.coords, event.move.symbol);

            }
            //console.log($scope.endGameMessage);
            $interval.cancel(intervalID);

          }
          if(event.event === 'Draw'){
            $scope.endGameMessage = "Game Draw";
            $scope.gameOver = true;
            $interval.cancel(intervalID);
          }
        });

    };


    var intervalID = $interval(function(){
      $scope.updateEvents();
    }, 500);

  });
