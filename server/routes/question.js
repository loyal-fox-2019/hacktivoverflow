'use strict';

const express = require('express');
const routes = express.Router();
const QuestionController = require('../controllers/QuestionController');
const authentication = require('../middleware/authentication');
const questionAuthorization = require('../middleware/questionAuthorization');

routes.get('/', QuestionController.read);

routes.get('/:id', QuestionController.readOne)

routes.use(authentication);

routes.post('/', QuestionController.create);

routes.put('/:id', questionAuthorization, QuestionController.update);

routes.delete('/:id', questionAuthorization, QuestionController.delete);

routes.patch('/downvotes/:id', QuestionController.downVote);

routes.patch('/upvotes/:id', QuestionController.upVote);

module.exports = routes;