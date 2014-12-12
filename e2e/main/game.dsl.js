/**
 * Created by thordurth on 11.12.2014.
 */

module.exports = function(page){
  var tictactoe;

  function nameOfGame(gameName) {
    page.name.sendKeys(gameName);
  }

  function nameOfUser(userName) {
    page.userName.sendKeys(userName);
  }

  function createGame() {
    page.createGameButton.click();
  }

  function waitForTictactoePage() {
    browser.waitForAngular();
    tictactoe = require('./tictactoe.po');
  }

  function expectGameBoardShowing() {
    expect(tictactoe.board).toBeDefined();
  }

  function expectFirstCellShowing() {
    expect(tictactoe.cell0).toBeDefined();
  }


  function cell0(){
    tictactoe.cell0.click();
    browser.executeScript(function(){
      var c = document.getElementById("cell0");
      var ctx = c.getContext("2d");

      return ctx.isPointInStroke(22,22);
    }).then(function(ctx){

      expect(ctx).toBe(true);
    });
  }


  return {
    nameOfGame:nameOfGame,
    nameOfUser:nameOfUser,
    createGame: createGame,
    waitForTictactoePage:waitForTictactoePage,
    expectGameBoardShowing:expectGameBoardShowing,
    expectFirstCellShowing:expectFirstCellShowing,
    cell0:cell0
  }
};
