/**
 * Created by thordurth on 8.12.2014.
 */
angular.module('tictactoeApp')
  .factory('TicTacToeService', function () {

    var gameOwner;


    return {

      setGameOwner: function(name){
        gameOwner = name;
      },
      getGameOwner: function(){
        return gameOwner;
      }


    }
  });
