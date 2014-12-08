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
              id: cmd.id,
              event: "GameCreated",
              user: cmd.user,
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }]
          },
          "JoinGame": function(cmd){
            if(gameState.gameFull()){
              return [{
                id: cmd.id,
                event: "FullGameJoinAttempted",
                user: cmd.user,
                name: cmd.name,
                timeStamp: cmd.timeStamp
              }]
            }
            //gameFull = true;
            return [{
              id:  cmd.id,
              event:"GameJoined",
              user: cmd.user,
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }]

          },
          "MakeMove": function(cmd){
            if(gameState.notPlayerTurn(cmd)){
              return [{
                id: cmd.id,
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
                id: cmd.id,
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
                id: cmd.id,
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
                id: cmd.id,
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
              id: cmd.id,
              event:"MoveMade",
              user: cmd.user,
              move: {
                coords: cmd.move.coords,
                symbol: cmd.move.symbol
              },
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }]
          },
          "LeaveGame":function(cmd){
            return[{
                id: cmd.id,
                event:"LeftGame",
                user: cmd.user,
                name: cmd.name,
                timeStamp: cmd.timeStamp
              },
              {
                event:"PlayerWins",
                user: gameState.leaveGameWinner(cmd.user.userName),
                name: cmd.name,
                timeStamp: cmd.timeStamp
              }];

          }
      };
      return cmdHandler[cmd.cmd](cmd);
    }
  }
};
