/**
 * Created by Þórður on 3.12.2014.
 */
var _ = require('lodash');
var winCondition = require('./ticTacToeWinConditions.js');
//var checkWinConditions = winCondition(gameGrid);

module.exports = function(history){
  var gameFull = false;
  var gameGrid = ['','','','','','','','',''];
  var turn = 0;
  var notPlayerTurn = '';
  var symbol;

  //var notFirstTurn = '';
  _.each(history, function(event){
    if(event.event === "GameJoined"){
      gameFull = true;
      notPlayerTurn = event.user.userName;
    }
    if(event.event === "MoveMade"){

      var checkWinConditions = winCondition(gameGrid,symbol);
      if(turn % 2 === 0){
        symbol = 'X';
      }
      else {
        symbol = 'O';
      }
      gameGrid[event.move] = symbol;


      turn++;
      notPlayerTurn = event.user.userName;
    }
  });

  console.log("grid", gameGrid);
  //console.log("playerturn", playerTurn);

  return{
    gameFull: function(){
      return gameFull;
    },
    spotTaken: function(currentMove){
      if(gameGrid[currentMove] === ''){
        return false;
      }
      return true;
    },
    notPlayerTurn: function(){
      return notPlayerTurn;
    }
  }
};
