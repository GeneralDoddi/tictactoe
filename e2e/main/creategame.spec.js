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

  it('should accept game name and username and create game', function() {
    browser.driver.wait(function(){
      return    browser.driver.isElementPresent(by.css('.container')).then(function(el){
        return el === true;
      });
    }).
      then(function(){
        game.nameOfGame("Cheese!");
        game.nameOfUser("Jerry!");
        game.createGame();
        game.waitForTictactoePage();
        game.expectGameBoardShowing();
        game.expectFirstCellShowing();
      });

  });
});
