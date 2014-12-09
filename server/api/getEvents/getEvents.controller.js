/**
 * Created by thordurth on 9.12.2014.
 */
'use strict';

var _ = require('lodash');
var app = require('../../app');

exports.getEvents = function(req, res) {

  if(!app.eventStore){
    app.eventStore = require('../../eventstore/memorystore')();
  }

  var store = app.eventStore;
  console.log("req ",req);
  //console.log("res ",res);

  res.json(store.loadEvents(req.params.id));
};
