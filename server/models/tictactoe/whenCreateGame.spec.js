/**
 * Created by thordurth on 2.12.2014.
 */
var should = require('should');
var _ = require('lodash');

var tictactoe = [{
  event:"GameCreated",
  user:{
    userName:"Doddi"
  },
  name:"GameOfLife",
  timeStamp:"2014-01-01T03:06:00"
}];

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
    should(tictactoe.length).be.exactly(1);

    should(JSON.stringify(tictactoe)).be.exactly(JSON.stringify(then));
  });


});
