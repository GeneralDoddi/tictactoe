/**
 * Created by Þórður on 6.12.2014.
 */
'use strict';

var _ = require('lodash');
var boundedContext = require('../models/tictactoe/tictactoeBoundedContext');
var tictactoeHandler = require('../models/tictactoe/aggregate/tictactoe');

var app = require('../app');

exports.executeCommand = function(req, res) {
  try{

    if(!app.eventStore){
      app.eventStore = require('../eventstore/memorystore')();
    }

    var store = app.eventStore;

    var context = boundedContext(store, tictactoeHandler);

    var result = context.handleCommand(req.body);
    res.json(result);
  }
  catch(e){
    res.json(e)
  }
};
