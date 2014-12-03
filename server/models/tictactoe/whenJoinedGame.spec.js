/**
 * Created by Þórður on 2.12.2014.
 */
var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe.js');

describe('join game command', function(){

  it('should emit game joined event', function(){
    var given = [{
      event: "GameCreated",
      user:{
        userName:"Doddi"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:06:00"

    }];

    var when = {
      cmd: "JoinGame",
      user:{
        userName:"Gangsterinn"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:08:00"

    };

    var then = [{
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
      event: "GameCreated",
      user:{
        userName:"Doddi"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:06:00"

    },
      {
        event: "GameJoined",
        user:{
          userName:"Gangsterinn"
        },
        name:"GameOfLife",
        timeStamp:"2014-01-01T03:08:00"

      }];

    var when = {
      cmd: "JoinGame",
      user:{
        userName:"lamedude"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:10:00"

    };

    var then = [{
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

