/**
 * Created by Þórður on 3.12.2014.
 */
var should = require('should');
var _ = require('lodash');

describe('make move command', function(){

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

  it('should emit move made event', function(){

    var given = [
      createGameEvent,
      joinGameEvent
    ]

    var when = makeMoveEvent("Doddi","0","X");

    var then = [{
      event:"MoveMade",
      user:{
        userName:"Doddi"
      },
      move:{
        coords:"0",
        symbol:"X"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:12:00"
    }];

    var actualEvent = tictactoe(given).executeCommand(when);

    should(JSON.stringify(actualEvent)).be.exactly(JSON.stringify(then));
  });

  it('should reject move when spot taken', function(){
    var given = [
      createGameEvent,
      joinGameEvent,
      moveMadeEvent("Doddi","2","X")
    ];

    var when = makeMoveEvent("Gangsterinn","2","O");

    var then = [{
      event:"IllegalMove",
      user:{
        userName:"Gangsterinn"
      },
      move:{
        coords:"2",
        symbol:"O"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:12:00"
    }];

    var actualEvent = tictactoe(given).executeCommand(when);
    should(JSON.stringify(actualEvent)).be.exactly(JSON.stringify(then));
  });

  it('should emit reject move when not player turn', function(){
    // BROKEN TEST
    var given = [
      createGameEvent,
      joinGameEvent,
      moveMadeEvent("Doddi","2","X")
    ];

    var when = makeMoveEvent("Doddi","1","X");

    var then = [{
      event:"NotPlayerTurn",
      user:{
        userName:"Doddi"
      },
      move:{
        coords:"1",
        symbol:"X"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:12:00"
    }];

    var actualEvent = tictactoe(given).executeCommand(when);
   // console.log("event: ",actualEvent);
    should(JSON.stringify(actualEvent)).be.exactly(JSON.stringify(then));
  });

});
