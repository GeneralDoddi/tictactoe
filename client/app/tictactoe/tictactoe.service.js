/**
 * Created by thordurth on 8.12.2014.
 */
'use strict';
angular.module('tictactoeApp')
  .factory('TicTacToeService', function () {

    var gameOwner;
    var playerSymbol;
    var gameUUID;
    var gameJoined;
    var secondPlayer;
    var gameName;
    var player;


    return {

      setGameOwner: function(name){
        gameOwner = name;
      },
      getGameOwner: function(){
        return gameOwner;
      },
      setGameName: function(name){
        gameName = name;
      },
      getGameName: function(){
        return gameName;
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
      },
      getGameJoined: function(){
        return gameJoined;
      },
      setGameJoined: function(hasJoined){
        gameJoined = hasJoined;
      },
      setSecondPlayer: function(name){
        secondPlayer = name;
      },
      getSecondPlayer: function(){
        return secondPlayer;
      },
      setPlayer: function(clientName){
        player = clientName;
      },
      getPlayer: function(){
        return player;
      },
      draw: function(id, symbol){
        var c = document.getElementById("cell"+id);
        var cxt = c.getContext("2d");

        if(symbol === 'X'){
          cxt.beginPath();
          cxt.moveTo(10, 10);
          cxt.lineTo(90, 90);
          cxt.moveTo(90, 10);
          cxt.lineTo(10, 90);
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


    };
  });
