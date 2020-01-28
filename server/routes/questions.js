const questionsRouter = require("express").Router();
const QuestionController = require("../controllers/questionController.js");

const authentication = require("../middlewares/authentication");

questionsRouter.get('/',QuestionController.getAllQuestions);

questionsRouter.get('/:id',QuestionController.getOneQuestion);

questionsRouter.use('/',authentication);

questionsRouter.post('/',QuestionController.addNewQuestion);

questionsRouter.patch('/:id',QuestionController.updateQuestion);

questionsRouter.delete('/:id',QuestionController.deleteQuestion);


module.exports = questionsRouter;