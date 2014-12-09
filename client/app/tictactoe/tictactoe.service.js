/**
 * Created by thordurth on 8.12.2014.
 */
'use strict';
angular.module('tictactoeApp')
  .factory('TicTacToeService', function () {

    var gameOwner;
    var playerSymbol;
    var gameUUID;


    return {

      setGameOwner: function(name){
        gameOwner = name;
      },
      getGameOwner: function(){
        return gameOwner;
      },
      setPlayerSymbol: function(eventString){
        if(eventString === 'GameCreated'){
          playerSymbol = 'X';
        }
        else if(eventString === 'GameJoined'){
          playerSymbol = 'O';
        }
      },
      getPlayerSymbol: function(){
        return playerSymbol;
      },
      setUUID: function(uuid){
        gameUUID = uuid;
      },
      getUUID: function(){
        return gameUUID;
      },
      getNewDate: function(){
        return new Date();
      }


    };
  });
