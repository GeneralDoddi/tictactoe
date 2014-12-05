/**
 * Created by Þórður on 5.12.2014.
 */
var memorystore = require('./memorystore');
var should = require('should');

describe('In memory event store', function (){

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
    id:"1338",
    cmd: "JoinGame",
    user:{
      userName:"Gangsterinn"
    },
    name:"GameOfLife",
    timeStamp:"2014-01-01T03:08:00"

  };

  it('should return an empty array for unkown id', function(){

    var store = memorystore();

    var loadedEvents = store.loadEvents('80085');

    should(loadedEvents.length).be.exactly(0);
    should(loadedEvents).be.instanceOf(Array);

  });

  it('should return events previously stored', function(){

    var store = memorystore();

    store.storeEvents('1337',[createGameEvent]);

    var loadedEvents = store.loadEvents('1337');

    should(JSON.stringify(loadedEvents)).be.exactly(JSON.stringify([createGameEvent]));

  });

  it('should append stored events to previous stored events array', function(){
    var store = memorystore();

    store.storeEvents('1337',[createGameEvent,joinGameEvent]);

    var loadedEvents = store.loadEvents('1337');

    should(loadedEvents).eql([createGameEvent,joinGameEvent]);
    should(loadedEvents).not.eql([joinGameEvent,createGameEvent]);

  });

});
