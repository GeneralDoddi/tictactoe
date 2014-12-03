/**
 * Created by Þórður on 3.12.2014.
 */
var should = require('should');
var _ = require('lodash');

describe('make move command', function(){

  var tictactoe = require('./tictactoe.js');

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

});
