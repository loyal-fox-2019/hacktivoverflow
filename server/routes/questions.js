'use strict';
const Router = require('express').Router();
const controller = require('../controllers/QuestionController');
const answerController = require('../controllers/AnswerController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

Router.get('/', controller.getQuestions);
Router.get('/:questionId/answer', answerController.getAnswer);
Router.use(authentication);
Router.post('/:questionId/answer', answerController.answerQuestion);
Router.post('/', controller.createQuestion);
Router.patch('/:id', controller.editQuestion);
Router.patch('/:id/upvotes', controller.upvotes);
Router.patch('/:id/downvotes', controller.downvotes);
Router.put('/:id', authorization, controller.editQuestion);
Router.delete('/:id', authorization, controller.removeQuestion);

module.exports = Router;