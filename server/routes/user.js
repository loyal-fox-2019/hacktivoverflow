'use strict';
const Router = require('express').Router();
const controller = require('../controllers/UserController');
const authentication = require('../middlewares/authentication');

Router.post('/register', controller.registerUser);
Router.post('/', controller.login);
Router.patch('/addtags', authentication, controller.addTags);
Router.get('/questions', authentication, controller.getMyQuestions);
module.exports = Router;
