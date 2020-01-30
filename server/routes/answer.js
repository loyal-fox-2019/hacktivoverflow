'use strict';

const express = require('express');
const routes = express.Router();
const AnswerController = require('../controllers/AnswerController');
const authentication = require('../middleware/authentication');
const answerAuthorization = require('../middleware/answerAuthorization');

routes.get('/:id', AnswerController.read);

routes.get('/findAnswer/:id', AnswerController.readOne);

routes.use(authentication);

routes.post('/:id', AnswerController.create);

routes.put('/:id',  answerAuthorization, AnswerController.update);

routes.delete('/:id', answerAuthorization, AnswerController.delete);

routes.patch('/downvotes/:id', AnswerController.downvotes);

routes.patch('/upvotes/:id', AnswerController.upvotes);

module.exports = routes;