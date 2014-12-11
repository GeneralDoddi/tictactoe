/**
 * Created by thordurth on 11.12.2014.
 */
'use strict';

var TictactoePage = function() {
  this.container = element(by.css('.container'));
  this.board = element(by.css('#TicTacToebox'));
  this.cell0 = element(by.css('#cell0'));
};

module.exports = new TictactoePage();

