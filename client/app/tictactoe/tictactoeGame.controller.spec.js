/**
 * Created by thordurth on 8.12.2014.
 */

'use strict';

describe('Game controller for tictactoe', function(){

  // load the controller's module
  beforeEach(module('tictactoeApp'));

  var TictactoeControllerCtrl, scope, httpBackend, http;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $controller, $rootScope, $http, TicTacToeService) {
    http = $http;
    httpBackend = $injector.get('$httpBackend');

    TicTacToeService.draw = function(){
    };

    TicTacToeService.getNewDate = function(){
      return "2014-01-01T03:06:00";
    };
    TicTacToeService.getUUID = function(){
      return "1337";
    };
    TicTacToeService.getPlayer = function(){
      return "Doddi";
    };
    TicTacToeService.getPlayerSymbol = function(){
      return "X";
    };
    TicTacToeService.getGameName = function(){
      return "GameOfLife";
    };

    scope = $rootScope.$new();
    TictactoeControllerCtrl = $controller('TictactoeGameController', {
      $scope: scope
    });
  }));


  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should respond with game joined when player requests to join a game', function(){

    httpBackend.expectPOST('/api/joinGame/', {
      id:"1337",
      cmd: "JoinGame",
      user:{
        userName:"Doddi"
      },
      timeStamp:"2014-01-01T03:06:00"
    }).respond(
      [
        {
          id:"1337",
          event: "GameJoined",
          user:{
            userName:"Doddi"
          },
          timeStamp:"2014-01-01T03:06:00"
        }
      ]
    );

    scope.userName = "Doddi";

    scope.joinGame();


    httpBackend.flush();
    expect(scope.processedEvents.length).toBe(1);
  });

  it('should emit movemade when player makes a move', function(){

    httpBackend.expectPOST('/api/makeMove/', {
      id: "1337",
      cmd: 'MakeMove',
      user:{
        userName: "Doddi"
      },
      move:{
        coords: "1",
        symbol: "X"
      },
      name: "GameOfLife",
      timeStamp: "2014-01-01T03:06:00"
    }).respond(
      [
        {
          id:"1337",
          event: "MoveMade",
          user:{
            userName:"Doddi"
          },
          move: {
            coords: "1",
            symbol: "X"
          },
          name: "GameOfLife",
          timeStamp:"2014-01-01T03:06:00"
        }
      ]
    );

    var event = {
      target: {
        id: '1'
      }
    };

    scope.clickbox(event);


    httpBackend.flush();
    expect(scope.processedEvents.length).toBe(1);

  });

  it('should fetch past events when prompted', function(){

    httpBackend.expectGET('/api/getEvents/1337').respond([{
        id:"1337",
            event: "GameCreated",
            user:{
            userName:"Doddi"
          },
          name:"GameOfLife",
            timeStamp:"2014-01-01T03:06:00"

        },
        {
          id:"1337",
          event: "GameJoined",
          user:{
            userName:"Gangsterinn"
          },
          name:"GameOfLife",
          timeStamp:"2014-01-01T03:08:00"
        }
      ]
    );


    scope.updateEvents();

    httpBackend.flush();
    expect(scope.processPastEvents.length).toBe(2);


  });


});
