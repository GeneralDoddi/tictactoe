/**
 * Created by thordurth on 2.12.2014.
 */
var should = require('should');
var _ = require('lodash');

var tictactoe = require('./tictactoe.js');
  /*[{
  event:"GameCreated",
  user:{
    userName:"Doddi"
  },
  name:"GameOfLife",
  timeStamp:"2014-01-01T03:06:00"
}];*/

describe('create game command', function(){

  it('should emit game created event', function(){
    var given = [];

    var when = {
      cmd: "CreateGame",
      user:{
        userName:"Doddi"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:06:00"
    };

    var then = [{
      event: "GameCreated",
      user:{
        userName:"Doddi"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:06:00"

    }];

    var actualEvents = tictactoe(given).executeCommand(when);
    should(actualEvents.length).be.exactly(1);

    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });


});
