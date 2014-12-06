'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /api/makeMove', function() {
  it('should respond with event in JSON array', function(done) {
      var command = {
        id:"1337",
        cmd:"MakeMove",
        user:{
          userName: "Doddi"
        },
        move: {
          coords: "1",
          symbol: "X"
        },
        name:"GameOfLife",
        timeStamp:"2014-01-01T03:12:00"
      };


    var req = request(app);
    req
      .post('/api/makeMove')
      .type('json')
      .send(command)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

});
