/**
 * Created by Þórður on 6.12.2014.
 */
//TODO
/**
 * 1. testa create fallid
 * 2. testa
 */

describe('Controller: TictactoeController', function(){

  // load the controller's module
  beforeEach(module('tictactoeApp'));

  var TictactoeControllerCtrl, scope, httpBackend, http;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $controller, $rootScope, $http) {
    http = $http;
    httpBackend = $injector.get('$httpBackend');

    scope = $rootScope.$new();
    TictactoeControllerCtrl = $controller('TictactoeController', {
      $scope: scope
    });
  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should post create game event when username and name are filled out', function(){
    httpBackend.post('/api/createGame', {
        id:"1337",
        cmd: "CreateGame",
        user:{
          userName:"Doddi"
        },
        name:"GameOfLife",
        timeStamp:"2014-01-01T03:06:00"

      }
    ).respond({
      response: [
        {
          id:"1337",
          event: "GameCreated",
          user:{
            userName:"Doddi"
          },
          name:"GameOfLife",
          timeStamp:"2014-01-01T03:06:00"
        }
      ]
    });

    scope.name = "GameOfLife";

    scope.userName = "Doddi";

    scope.createGame();

    httpBackend.flush();
    expect(scope.processedEvents.length).toBe(1);


  });

});
