'use strict';

const express = require('express');
const routes = express.Router();
const user = require('./user');
const question = require('./question');
const answer = require('./answer');

routes.use('/user', user);

routes.use('/question', question);

routes.use('/answer', answer);

module.exports = routes;