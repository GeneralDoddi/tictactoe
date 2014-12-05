/**
 * Created by Þórður on 2.12.2014.
 */
var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe.js');

describe('join game command', function(){

  var createGameEvent = {
    id:"1337",
    event: "GameCreated",
    user:{
      userName:"Doddi"
    },
    name:"GameOfLife",
    timeStamp:"2014-01-01T03:06:00"

  };

  var joinGameEvent = {
    id:"1337",
    cmd: "JoinGame",
    user:{
      userName:"Gangsterinn"
    },
    name:"GameOfLife",
    timeStamp:"2014-01-01T03:08:00"

  };

  it('should emit game joined event', function(){
    var given = [
      createGameEvent
    ];

    var when = joinGameEvent;

    var then = [{
      id:"1337",
      event: "GameJoined",
      user:{
        userName:"Gangsterinn"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:08:00"

    }];

    var actualEvents = tictactoe(given).executeCommand(when);
    should(actualEvents.length).be.exactly(1);

    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });

  it('should emit game full when attempting to join a full game', function(){

    var given = [{
      id:"1337",
      event: "GameCreated",
      user:{
        userName:"Doddi"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:06:00"

    },
      {
        id:"1337",
        event: "GameJoined",
        user:{
          userName:"Gangsterinn"
        },
        name:"GameOfLife",
        timeStamp:"2014-01-01T03:08:00"

      }];

    var when = {
      id:"1337",
      cmd: "JoinGame",
      user:{
        userName:"lamedude"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:10:00"

    };

    var then = [{
      id:"1337",
      event: "FullGameJoinAttempted",
      user:{
        userName:"lamedude"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:10:00"
    }];

    var actualEvents = tictactoe(given).executeCommand(when);
    //console.log("actualEvents", actualEvents);
    //should(actualEvents.length).be.exactly(1);

    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });

});

