/**
 * Created by thordurth on 11.12.2014.
 */
'use strict';
console.debug = console.log;

var gameDSL = require('./game.dsl');

describe('Tictactoe game play', function() {
  var page;
  var game;

  beforeEach(function() {
    browser.get('/');
    page = require('./creategame.po');
    game = gameDSL(page);
  });

  it('should accept game name and username and create game and make first move', function() {

    game.nameOfGame("Cheese!");
    game.nameOfUser("Jerry!");
    game.createGame();
    game.waitForTictactoePage();
    game.cell0();


  });

  it('should create a game and a second player joins', function() {

    game.nameOfGame("GameOfLife");
    game.nameOfUser("Doddi");
    game.createGame();
    game.waitForTictactoePage();

    browser.getCurrentUrl().then(function(url) {
      browser.getAllWindowHandles().then(function (handles) {
        var firstwindow = handles[0];

        browser.executeScript('window.open("'+ url +'", "second-window")');

        browser.switchTo().window('second-window');

        game.joinGameName("Gangsterinn");
        game.joinGame();
        browser.sleep(1000);

        game.expectPlayerTwoNameShowing();



        //browser.switchTo().window('firstwindow');


      });
    });
  });

});
