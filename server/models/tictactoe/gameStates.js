/**
 * Created by Þórður on 3.12.2014.
 */
var _ = require('lodash');

module.exports = function(history){
  var gameFull = false;
  var gameGrid = ['','','','','','','','',''];
  var turn = 0;
  var playerTurn = '';
  _.each(history, function(event){
    if(event.event === "GameJoined"){
      gameFull = true;
    }
  });
  _.each(history, function(move){
    if(move.event === "MoveMade"){

      if(turn % 2 === 0){
        gameGrid[move.move] = 'X';
        playerTurn = move.user.userName;
      }
      else{
        gameGrid[move.move] = 'O';
        playerTurn = move.user.userName;
      }
      turn++;
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
    playerTurn: function(){
      return playerTurn;
    }
  }
};
