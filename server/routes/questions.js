const questionsRouter = require("express").Router();
const QuestionController = require("../controllers/questionController.js");

const authentication = require("../middlewares/authentication");
const authorisation = require("../middlewares/authorisation").question_authorisation;

questionsRouter.get('/',QuestionController.getAllQuestions);

questionsRouter.get('/:id',QuestionController.getOneQuestion);

questionsRouter.use('/',authentication);

questionsRouter.get('/:id/vote',QuestionController.getMyVote);

questionsRouter.post('/',QuestionController.addNewQuestion);

questionsRouter.post('/:id/vote',QuestionController.voteQuestion);

questionsRouter.patch('/:id',authorisation,QuestionController.updateQuestion);

questionsRouter.delete('/:id',authorisation,QuestionController.deleteQuestion);


module.exports = questionsRouter;