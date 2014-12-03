/**
 * Created by thordurth on 2.12.2014.
 */
module.exports = function(history){

  var states = require('./gameStates');

  var gameState = states(history);

  return {
    executeCommand: function(cmd){

      var cmdHandler = {
          "CreateGame": function(cmd){
            return [{
              event: "GameCreated",
              user: cmd.user,
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }]
          },
          "JoinGame": function(cmd){
            if(gameState.gameFull()){
              return [{
                event: "FullGameJoinAttempted",
                user: cmd.user,
                name: cmd.name,
                timeStamp: cmd.timeStamp
              }]
            }
            //gameFull = true;
            return [{
              event:"GameJoined",
              user: cmd.user,
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }]

          },
          "MakeMove": function(cmd){
            if(gameState.notPlayerTurn(cmd)){
              return [{
                event:"NotPlayerTurn",
                user: cmd.user,
                move: {
                  coords: cmd.move.coords,
                  symbol: cmd.move.symbol
                },
                name: cmd.name,
                timeStamp: cmd.timeStamp
              }]
            }
            if(gameState.spotTaken(cmd)){
              return [{
                event:"IllegalMove",
                user: cmd.user,
                move: {
                  coords: cmd.move.coords,
                  symbol: cmd.move.symbol
                },
                name: cmd.name,
                timeStamp: cmd.timeStamp
              }]
            }
            gameState.makeMove(cmd);

            if(gameState.isWin()){
              return [{
                event:"PlayerWins",
                user: cmd.user,
                move: {
                  coords: cmd.move.coords,
                  symbol: cmd.move.symbol
                },
                name: cmd.name,
                timeStamp: cmd.timeStamp
              }]
            }
            if(gameState.isDraw()){
              return [{
                event:"Draw",
                user: cmd.user,
                move: {
                  coords: cmd.move.coords,
                  symbol: cmd.move.symbol
                },
                name: cmd.name,
                timeStamp: cmd.timeStamp
              }]
            }
            return[{
              event:"MoveMade",
              user: cmd.user,
              move: {
                coords: cmd.move.coords,
                symbol: cmd.move.symbol
              },
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }]
          }
      }
      return cmdHandler[cmd.cmd](cmd);
    }
  }
}
