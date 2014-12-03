/**
 * Created by thordurth on 2.12.2014.
 */
module.exports = function(history,currentMove){

  var states = require('./gameStates');

  var gameState = states(history, currentMove)

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
            if(gameState.notPlayerTurn() === cmd.user.userName){
              return [{
                event:"NotPlayerTurn",
                user: cmd.user,
                move: cmd.move,
                name: cmd.name,
                timeStamp: cmd.timeStamp
              }]
            }
            if(gameState.spotTaken(cmd.move)){
              return [{
                event:"IllegalMove",
                user: cmd.user,
                move: cmd.move,
                name: cmd.name,
                timeStamp: cmd.timeStamp
              }]
            }

            return[{
              event:"MoveMade",
              user: cmd.user,
              move: cmd.move,
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }]
          }
      }
      return cmdHandler[cmd.cmd](cmd);
    }
  }
}
