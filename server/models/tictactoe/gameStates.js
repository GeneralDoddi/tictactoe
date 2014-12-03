/**
 * Created by Þórður on 3.12.2014.
 */
var _ = require('lodash');

module.exports = function(history){
  var gameFull = false;
  var spotTaken = false;
  var gameGrid = ['','','','','','','','',''];
  var playerTurn = 0;
  _.each(history, function(event){
    if(event.event === "GameJoined"){
      gameFull = true;
    }
  });
  _.each(history, function(move){
    if(move.event === "MoveMade"){

      if(playerTurn % 2 === 0){
        gameGrid[move.move] = 'X';
      }
      else{
        gameGrid[move.move] = 'O';
      }
      playerTurn++;
    }
  });

  console.log("grid", gameGrid);

  return{
    gameFull: function(){
      return gameFull;
    },
    spotTaken: function(currentMove){
      if(gameGrid[currentMove] === ''){
        return false;
      }
      return true;
    }
  }
};
