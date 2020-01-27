const routes = require("express").Router();
const questionsRouter = require("./questions");
const usersRouter = require("./users");

routes.use('/questions', questionsRouter);
routes.use('/users',usersRouter);

module.exports = routes;