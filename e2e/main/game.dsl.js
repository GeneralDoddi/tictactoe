/**
 * Created by thordurth on 11.12.2014.
 */

module.exports = function(page){
  var tictactoe;
  var cellId;

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


  function scriptExecution(cellid){

    browser.driver.executeScript(function(id){
      var c = document.getElementById(id);
      var ctx = c.getContext("2d");

      return ctx.isPointInStroke(22,22);
    },cellid).then(function(ctx){

      expect(ctx).toBe(true);
    });
  }

  function cell0(){
    tictactoe.cell0.click();
    scriptExecution('cell0');
  }

  function cell1(){
    tictactoe.cell1.click();
    scriptExecution('cell1');
  }

  function cell2(){
    tictactoe.cell2.click();
    scriptExecution('cell2');
  }

  function cell3(){
    tictactoe.cell3.click();
    scriptExecution('cell3');
  }

  function cell4(){
    tictactoe.cell4.click();
    scriptExecution('cell4');
  }

  function cell5(){
    tictactoe.cell5.click();
    scriptExecution('cell5');
  }

  function cell6(){
    tictactoe.cell6.click();
    scriptExecution('cell6');
  }

  function cell7(){
    tictactoe.cell7.click();
    scriptExecution('cell7');
  }

  function cell8(){
    tictactoe.cell8.click();
    scriptExecution('cell8');
  }

  function joinGameName(userName){
    tictactoe.userName.sendKeys(userName);
  }

  function joinGame(){
    tictactoe.joinGameButton.click();
  }

  function expectPlayerOneNameShowing(){
    expect(tictactoe.playerOne.getText()).toBe('Doddi');
  }

  function expectPlayerTwoNameShowing(){
    expect(tictactoe.playerTwo.getText()).toBe('Gangsterinn');
  }

  function waitForPage() {
    browser.waitForAngular();
  }

  function expectGameOverMessage(message){
    expect(tictactoe.gameOver.getText()).toBe(message);
  }

  return {
    nameOfGame:nameOfGame,
    nameOfUser:nameOfUser,
    createGame: createGame,
    waitForTictactoePage:waitForTictactoePage,
    expectGameBoardShowing:expectGameBoardShowing,
    expectFirstCellShowing:expectFirstCellShowing,
    cell0:cell0,
    cell1:cell1,
    cell2:cell2,
    cell3:cell3,
    cell4:cell4,
    cell5:cell5,
    cell6:cell6,
    cell7:cell7,
    cell8:cell8,
    joinGameName:joinGameName,
    joinGame:joinGame,
    expectPlayerOneNameShowing: expectPlayerOneNameShowing,
    expectPlayerTwoNameShowing: expectPlayerTwoNameShowing,
    waitForPage:waitForPage,
    expectGameOverMessage:expectGameOverMessage

  }
};
