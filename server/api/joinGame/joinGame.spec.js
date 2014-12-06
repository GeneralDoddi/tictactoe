/**
 * Created by Þórður on 6.12.2014.
 */
'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /api/joinGame', function() {
  it('should respond with event in JSON array', function(done) {
    var command =     {
      id:"1337",
      cmd: "JoinGame",
      user:{
        userName:"Gangsterinn"
      },
      name:"GameOfLife",
      timeStamp:"2014-01-01T03:08:00"

    };


    var req = request(app);
    req
      .post('/api/joinGame')
      .type('json')
      .send(command)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

});/**
 * Created by Þórður on 6.12.2014.
 */
