/**
 * Created by thordurth on 2.12.2014.
 */
module.exports = function(){

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
            return [{
              event: "GameJoined",
              user: cmd.user,
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }]
          }

      }
      return cmdHandler[cmd.cmd](cmd);
    }
  }
}
