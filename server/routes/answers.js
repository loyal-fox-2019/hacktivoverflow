const answersRouter = require("express").Router();
const AnswerController = require("../controllers/answerController.js");

const authentication = require("../middlewares/authentication");

answersRouter.use('/',authentication);

answersRouter.post('/',AnswerController.addNewAnswer);

answersRouter.get('/:id/vote',AnswerController.getMyVote);

answersRouter.post('/:id/vote',AnswerController.voteAnswer);

answersRouter.patch('/:id',AnswerController.updateAnswer);

module.exports = answersRouter;