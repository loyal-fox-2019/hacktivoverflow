const answersRouter = require("express").Router();
const AnswerController = require("../controllers/questionController.js");

const authentication = require("../middlewares/authentication");

answersRouter.get('/');

answersRouter.use('/',authentication);

answersRouter.post('/');

answersRouter.patch('/');

answersRouter.delete('/');


module.exports = answersRouter;