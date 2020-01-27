'use strict';
const Router = require('express').Router();
const controller = require('../controllers/QuestionController');

Router.post('/', controller.createQuestion);
Router.patch('/:id', controller.editQuestion);

module.exports = Router;