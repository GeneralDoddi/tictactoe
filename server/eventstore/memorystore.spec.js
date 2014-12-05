/**
 * Created by Þórður on 5.12.2014.
 */
var memorystore = require('./memorystore');
var should = require('should');

describe('In memory event store', function (){

  it('should return an empty array for unkown id', function(){

    var store = memorystore();

    var loadedEvents = store.loadEvents('80085');

    should(loadedEvents.length).be.exactly(0);
    should(loadedEvents).be.instanceOf(Array);

  });

  it('should return events previously stored', function(){

    var store = memorystore();


  });

});
