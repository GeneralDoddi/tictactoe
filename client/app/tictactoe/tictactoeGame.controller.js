/**
 * Created by thordurth on 8.12.2014.
 */
angular.module('tictactoeApp')
  .controller('TictactoeGameController', function ($scope, $http, TicTacToeService) {

      $scope.clickbox = function(event){
        console.log(event);

       // draw((event.target.id),'O');
        console.log(TicTacToeService.getGameOwner());

        var postPromise = $http.post('/api/makeMove/',{
          id:'1337',
          cmd: 'MakeMove',
          user:{
            userName:TicTacToeService.getGameOwner()
          },
          move:{
            coords: event.target.id,
            symbol: TicTacToeService.getPlayerSymbol()
          },
          name:$scope.name,
          timeStamp:'2014-01-01T03:06:00'

        });

        postPromise.then(function(data){
          if(data.data.event === 'MoveMade'){
            draw(event.target.id, 'X');
          }
          console.log(data.data);
          //$scope.processEvents(data.data);
        });
      };

    function draw(id, symbol){

      c = document.getElementById(id);
      cxt = c.getContext("2d");

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

  });
