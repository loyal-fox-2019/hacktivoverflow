const questionsRouter = require("express").Router();
const QuestionController = require("../controllers/questionController.js");

const authentication = require("../middlewares/authentication");

questionsRouter.get('/',QuestionController.getAllQuestions);

questionsRouter.get('/:id',QuestionController.getOneQuestion);

questionsRouter.use('/',authentication);

questionsRouter.post('/');

questionsRouter.patch('/');

questionsRouter.delete('/');


module.exports = questionsRouter;