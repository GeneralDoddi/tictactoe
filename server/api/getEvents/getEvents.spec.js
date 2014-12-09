/**
 * Created by thordurth on 9.12.2014.
 */


'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/getEvents', function() {
  it('should respond with event in JSON array', function(done) {
    var command = {
      id:"1337"
    };


    var req = request(app);
    req
      .get('/api/getEvents/'+command.id)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

});
