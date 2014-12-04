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

  it('should emit game won when [0,1,2] arrays are filled with X', function(){

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

  it('should emit game won when [3,4,5] arrays are filled with X', function(){

    var given = [
      createGameEvent,
      joinGameEvent,
      moveMadeEvent("Doddi","3","X"),
      moveMadeEvent("Gangsterinn","0","O"),
      moveMadeEvent("Doddi","4","X"),
      moveMadeEvent("Gangsterinn","1","O")

    ];

    var when = makeMoveEvent("Doddi","5","X");

    var then = [{
      event:"PlayerWins",
      user:{
        userName:"Doddi"
      },
      move:{
        coords:"5",
        symbol:"X"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:12:00"
    }];

    var actualEvent = tictactoe(given).executeCommand(when);
    should(JSON.stringify(actualEvent)).be.exactly(JSON.stringify(then));
  });

  it('should emit game won when [6,7,8] arrays are filled with X', function(){

    var given = [
      createGameEvent,
      joinGameEvent,
      moveMadeEvent("Doddi","6","X"),
      moveMadeEvent("Gangsterinn","0","O"),
      moveMadeEvent("Doddi","7","X"),
      moveMadeEvent("Gangsterinn","1","O")

    ];

    var when = makeMoveEvent("Doddi","8","X");

    var then = [{
      event:"PlayerWins",
      user:{
        userName:"Doddi"
      },
      move:{
        coords:"8",
        symbol:"X"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:12:00"
    }];

    var actualEvent = tictactoe(given).executeCommand(when);
    should(JSON.stringify(actualEvent)).be.exactly(JSON.stringify(then));
  });

  it('should emit game won when [0,3,6] arrays are filled with X', function(){

    var given = [
      createGameEvent,
      joinGameEvent,
      moveMadeEvent("Doddi","0","X"),
      moveMadeEvent("Gangsterinn","1","O"),
      moveMadeEvent("Doddi","3","X"),
      moveMadeEvent("Gangsterinn","2","O")

    ];

    var when = makeMoveEvent("Doddi","6","X");

    var then = [{
      event:"PlayerWins",
      user:{
        userName:"Doddi"
      },
      move:{
        coords:"6",
        symbol:"X"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:12:00"
    }];

    var actualEvent = tictactoe(given).executeCommand(when);
    should(JSON.stringify(actualEvent)).be.exactly(JSON.stringify(then));
  });

  it('should emit game won when [1,4,7] arrays are filled with X', function(){

    var given = [
      createGameEvent,
      joinGameEvent,
      moveMadeEvent("Doddi","1","X"),
      moveMadeEvent("Gangsterinn","0","O"),
      moveMadeEvent("Doddi","4","X"),
      moveMadeEvent("Gangsterinn","3","O")

    ];

    var when = makeMoveEvent("Doddi","7","X");

    var then = [{
      event:"PlayerWins",
      user:{
        userName:"Doddi"
      },
      move:{
        coords:"7",
        symbol:"X"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:12:00"
    }];

    var actualEvent = tictactoe(given).executeCommand(when);
    should(JSON.stringify(actualEvent)).be.exactly(JSON.stringify(then));
  });

  it('should emit game won when [2,5,8] arrays are filled with X', function(){

    var given = [
      createGameEvent,
      joinGameEvent,
      moveMadeEvent("Doddi","2","X"),
      moveMadeEvent("Gangsterinn","0","O"),
      moveMadeEvent("Doddi","5","X"),
      moveMadeEvent("Gangsterinn","3","O")

    ];

    var when = makeMoveEvent("Doddi","8","X");

    var then = [{
      event:"PlayerWins",
      user:{
        userName:"Doddi"
      },
      move:{
        coords:"8",
        symbol:"X"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:12:00"
    }];

    var actualEvent = tictactoe(given).executeCommand(when);
    should(JSON.stringify(actualEvent)).be.exactly(JSON.stringify(then));
  });

  it('should emit game won when [0,4,8] arrays are filled with X', function(){

    var given = [
      createGameEvent,
      joinGameEvent,
      moveMadeEvent("Doddi","0","X"),
      moveMadeEvent("Gangsterinn","1","O"),
      moveMadeEvent("Doddi","4","X"),
      moveMadeEvent("Gangsterinn","3","O")

    ];

    var when = makeMoveEvent("Doddi","8","X");

    var then = [{
      event:"PlayerWins",
      user:{
        userName:"Doddi"
      },
      move:{
        coords:"8",
        symbol:"X"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:12:00"
    }];

    var actualEvent = tictactoe(given).executeCommand(when);
    should(JSON.stringify(actualEvent)).be.exactly(JSON.stringify(then));
  });

  it('should emit game won when [2,4,6] arrays are filled with X', function(){

    var given = [
      createGameEvent,
      joinGameEvent,
      moveMadeEvent("Doddi","2","X"),
      moveMadeEvent("Gangsterinn","1","O"),
      moveMadeEvent("Doddi","4","X"),
      moveMadeEvent("Gangsterinn","3","O")

    ];

    var when = makeMoveEvent("Doddi","6","X");

    var then = [{
      event:"PlayerWins",
      user:{
        userName:"Doddi"
      },
      move:{
        coords:"6",
        symbol:"X"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:12:00"
    }];

    var actualEvent = tictactoe(given).executeCommand(when);
    should(JSON.stringify(actualEvent)).be.exactly(JSON.stringify(then));
  });

  it('should emit game draw when game grid is full and no winner', function(){

    var given = [
      createGameEvent,
      joinGameEvent,
      moveMadeEvent("Doddi","0","X"),
      moveMadeEvent("Gangsterinn","2","O"),
      moveMadeEvent("Doddi","1","X"),
      moveMadeEvent("Gangsterinn","4","O"),
      moveMadeEvent("Doddi","5","X"),
      moveMadeEvent("Gangsterinn","3","O"),
      moveMadeEvent("Doddi","6","X"),
      moveMadeEvent("Gangsterinn","7","O")
    ];

    var when = makeMoveEvent("Doddi","8","X");

    var then = [{
      event:"Draw",
      user:{
        userName:"Doddi"
      },
      move:{
        coords:"8",
        symbol:"X"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:12:00"
    }];

    var actualEvent = tictactoe(given).executeCommand(when);
    should(JSON.stringify(actualEvent)).be.exactly(JSON.stringify(then));
  });

  it('should emit Player wins on the remaining player after opponent leaves', function(){

    var given = [
      createGameEvent,
      joinGameEvent,
      moveMadeEvent("Doddi","0","X"),
      moveMadeEvent("Gangsterinn","2","O"),
    ];

    var when = {
      cmd:"LeaveGame",
      user:{
        userName:"Gangsterinn"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:12:00"
    };

    var then = [{
      event:"LeftGame",
      user:{
        userName:"Gangsterinn"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:12:00"
      },
      {
      event:"PlayerWins",
      user:{
        userName:"Doddi"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:12:00"
    }];

    var actualEvent = tictactoe(given).executeCommand(when);
    should(JSON.stringify(actualEvent)).be.exactly(JSON.stringify(then));
  });
});
