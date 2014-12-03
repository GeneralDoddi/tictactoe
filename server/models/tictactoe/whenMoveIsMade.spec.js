/**
 * Created by Þórður on 3.12.2014.
 */
var should = require('should');
var _ = require('lodash');

describe('make move command', function(){

  var tictactoe = require('./tictactoe.js');

  var playerTurnCheck = function(history){

    return history[history.length-1].user.userName;
  };

  it('should emit move made event', function(){

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
      cmd:"MakeMove",
      user:{
        userName:"Doddi"
      },
      move:"0",
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:12:00"
    };

    var then = [{
      event:"MoveMade",
      user:{
        userName:"Doddi"
      },
      move:"0",
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:12:00"
    }];

    var actualEvent = tictactoe(given).executeCommand(when);

    should(JSON.stringify(actualEvent)).be.exactly(JSON.stringify(then));
  });

  it('should emit reject move when not player turn', function(){
    // BROKEN TEST
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

      },
      {
        event:"MoveMade",
        user:{
          userName:"Doddi"
        },
        move:"0",
        name:"GameOfLife",
        timeStamp:"2014-01-01T03:12:00"
      }
    ];

    var when = {
      cmd:"MakeMove",
      user:{
        userName:"Doddi"
      },
      move:"1",
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:12:12"
    };

    var then = [{
      event:"MoveMade",
      user:{
        userName:"Doddi"
      },
      move:"0",
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:12:00"
    }];

    var actualEvent = playerTurnCheck(given);
    console.log("event: ",actualEvent);
    should(when.user.userName).be.exactly(actualEvent);
  });

  it('should reject move when spot taken', function(){
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

      },
      {
        event:"MoveMade",
        user:{
          userName:"Doddi"
        },
        move:"0",
        name:"GameOfLife",
        timeStamp:"2014-01-01T03:12:00"
      }
    ];

    var when = {
      cmd:"MakeMove",
      user:{
        userName:"Gangsterinn"
      },
      move:"0",
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:12:12"
    };

    var then = [{
      event:"IllegalMove",
      user:{
        userName:"Gangsterinn"
      },
      move:"0",
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:12:12"
    }];

    var actualEvent = tictactoe(given).executeCommand(when);
    should(JSON.stringify(actualEvent)).be.exactly(JSON.stringify(then));
  });

});
