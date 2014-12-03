/**
 * Created by Þórður on 3.12.2014.
 */
var _ = require('lodash');
var winCondition = require('./ticTacToeWinConditions.js');
//var checkWinConditions = winCondition(gameGrid);

module.exports = function(history){
  var gameFull = false;
  var gameGrid = ['','','','','','','','',''];
  var turn = 1;
  var notPlayerTurn = '';
  var win;
  var symbol;

  //var notFirstTurn = '';
  _.each(history, function(event){
    if(event.event === "GameJoined"){
      gameFull = true;
      notPlayerTurn = event.user.userName;
    }
    if(event.event === "MoveMade"){


      if(turn % 2 === 0){
        symbol = event.move.symbol;
      }
      else {
        symbol = event.move.symbol;
      }
      gameGrid[event.move.coords] = symbol;


      turn++;
      notPlayerTurn = event.user.userName;
    }
  });



  function makeMove(event){
    gameGrid[event.move.coords] = event.move.symbol;
    console.log("grid", gameGrid);
    var checkWinConditions = winCondition(gameGrid,event.move.symbol);
    win = checkWinConditions.isWin();
  }

  function spotTakenCheck(event){
    return !(gameGrid[event.move.coords] === '');
  }

  function notPlayerTurnCheck(event){
    return event.user.userName === notPlayerTurn;
  }
  //console.log("playerturn", playerTurn);

  return{
    gameFull: function(){
      return gameFull;
    },
    spotTaken: function(event){
      return spotTakenCheck(event);
    },
    notPlayerTurn: function(event){
      return notPlayerTurnCheck(event);
    },
    isWin: function(){
      return win;
    },
    makeMove: function(event){
      makeMove(event);
    },
    isDraw: function(){
      if(turn == 9){
        return true;
      }
      return false;
    }

  }
};
