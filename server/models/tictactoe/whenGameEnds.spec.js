/**
 * Created by thordurth on 3.12.2014.
 */
var should = require('should');
var _ = require('lodash');

describe('game end condition', function(){

  var tictactoe = require('./tictactoe.js');

  var createGameEvent = {
    event: "GameCreated",
    user:{
      userName:"Doddi"
    },
    name:"GameOfLife",
    timeStamp:"2014-01-01T03:06:00"

  };

  var joinGameEvent = {
    event: "GameJoined",
    user:{
      userName:"Gangsterinn"
    },
    name:"GameOfLife",
    timeStamp:"2014-01-01T03:08:00"

  };

  var makeMoveEvent = function(name, coords, symbol){
    return{
      cmd:"MakeMove",
      user:{
        userName: name
      },
      move: {
        coords: coords,
        symbol: symbol
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:12:00"
    }
  };

  var moveMadeEvent = function(name, coords, symbol){
    return{
      event:"MoveMade",
      user:{
        userName: name
      },
      move:{
        coords: coords,
        symbol: symbol
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:12:00"
    }
  };

  it('should emit game won when win condition is fulfilled', function(){

    var given = [
      createGameEvent,
      joinGameEvent,
      moveMadeEvent("Doddi","0","X"),
      moveMadeEvent("Gangsterinn","4","O"),
      moveMadeEvent("Doddi","1","X"),
      moveMadeEvent("Gangsterinn","5","O")

    ];

    var when = makeMoveEvent("Doddi","2","X");

    var then = [{
      event:"PlayerWins",
      user:{
        userName:"Doddi"
      },
      move:{
        coords:"2",
        symbol:"X"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:12:00"
    }];

    var actualEvent = tictactoe(given).executeCommand(when);
    should(JSON.stringify(actualEvent)).be.exactly(JSON.stringify(then));
  });
});
