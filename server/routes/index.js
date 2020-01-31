const routes = require("express").Router();
const questionsRouter = require("./questions");
const usersRouter = require("./users");
const answersRouter = require("./answers");

routes.use('/questions', questionsRouter);
routes.use('/answers', answersRouter);
routes.use('/users',usersRouter);

module.exports = routes;