/**
 * Created by thordurth on 11.12.2014.
 */
/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var CreateGamePage = function() {
  this.container = element(by.css('.container'));
  this.name = element(by.css('#name'));
  this.userName = element(by.css('#userName'));
  this.createGameButton = element(by.css('#createGameButton'));
};

module.exports = new CreateGamePage();
