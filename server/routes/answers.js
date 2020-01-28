const answersRouter = require("express").Router();
const AnswerController = require("../controllers/questionController.js");

const authentication = require("../middlewares/authentication");

answersRouter.use('/',authentication);

answersRouter.post('/');

answersRouter.post('/:id/vote');

answersRouter.patch('/:id');

module.exports = answersRouter;