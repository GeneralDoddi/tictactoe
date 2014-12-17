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
        var secondwindow = 'second-window';

        browser.executeScript('window.open("'+ url +'", "second-window","height=800,width=800,status=yes,toolbar=no,menubar=no,location=no")');

        browser.switchTo().window(secondwindow).then(function(){
          game.joinGameName("Gangsterinn");
          game.joinGame();
          browser.sleep(1000);

          game.expectPlayerTwoNameShowing();
          game.expectPlayerOneNameShowing();

          browser.switchTo().window(firstwindow).then(function(){
            game.expectPlayerTwoNameShowing();
          });
        });
      });
    });
  });

  it('should emit a player 1 (Doddi) wins message', function() {

    game.nameOfGame("GameOfLife");
    game.nameOfUser("Doddi");
    game.createGame();
    game.waitForTictactoePage();

    browser.getCurrentUrl().then(function(url) {
      browser.getAllWindowHandles().then(function (handles) {
        var firstwindow = handles[0];
        var secondwindow = 'second-window';

        browser.executeScript('window.open("'+ url +'", "second-window","height=800,width=800,status=yes,toolbar=no,menubar=no,location=no")');

        browser.switchTo().window(secondwindow).then(function(){
          game.joinGameName("Gangsterinn");
          game.joinGame();
          browser.sleep(1000);

          game.expectPlayerTwoNameShowing();
          game.expectPlayerOneNameShowing();

          browser.switchTo().window(firstwindow).then(function(){
            game.expectPlayerTwoNameShowing();
            game.cell0();
            browser.switchTo().window(secondwindow).then(function(){
              game.cell1();
              browser.switchTo().window(firstwindow).then(function(){
                game.cell4();
                browser.switchTo().window(secondwindow).then(function(){
                  game.cell2();
                  browser.switchTo().window(firstwindow).then(function(){
                    game.cell8();
                    browser.sleep(1000);
                    game.expectGameOverMessage('Doddi wins');
                  });
                });
              });
            });
          });
        });
      });
    });
  });

  it('should emit a Game Draw message', function() {

    game.nameOfGame("GameOfLife");
    game.nameOfUser("Doddi");
    game.createGame();
    game.waitForTictactoePage();

    browser.getCurrentUrl().then(function(url) {
      browser.getAllWindowHandles().then(function (handles) {
        var firstwindow = handles[0];
        var secondwindow = 'second-window';

        browser.executeScript('window.open("'+ url +'", "second-window","height=800,width=800,status=yes,toolbar=no,menubar=no,location=no")');

        browser.switchTo().window(secondwindow).then(function(){
          game.joinGameName("Gangsterinn");
          game.joinGame();
          browser.sleep(1000);

          game.expectPlayerTwoNameShowing();
          game.expectPlayerOneNameShowing();

          browser.switchTo().window(firstwindow).then(function(){
            game.expectPlayerTwoNameShowing();
            game.cell0();
            browser.switchTo().window(secondwindow).then(function(){
              game.cell1();
              browser.switchTo().window(firstwindow).then(function(){
                game.cell2();
                browser.switchTo().window(secondwindow).then(function(){
                  game.cell4();
                  browser.switchTo().window(firstwindow).then(function(){
                    game.cell3();
                    browser.switchTo().window(secondwindow).then(function() {
                      game.cell5();
                      browser.switchTo().window(firstwindow).then(function() {
                        game.cell7();
                        browser.switchTo().window(secondwindow).then(function() {
                          game.cell6();
                          browser.switchTo().window(firstwindow).then(function() {
                            game.cell8();
                            game.waitForTictactoePage();
                            browser.sleep(1000);
                            game.expectGameOverMessage('Game Draw');
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });

});
