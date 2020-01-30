'use strict';
const Router = require('express').Router();
const controller = require('../controllers/AnswerController');
const Authentication = require('../middlewares/authentication');

Router.use(Authentication);
Router.patch('/:id/upvotes', controller.upvotes);
Router.patch('/:id/downvotes', controller.downvotes);

module.exports = Router;