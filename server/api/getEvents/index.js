/**
 * Created by thordurth on 9.12.2014.
 */
'use strict';

var express = require('express');
var controller = require('./getEvents.controller.js');

var router = express.Router();

router.get('/:uuid', controller.getEvents);

module.exports = router;
