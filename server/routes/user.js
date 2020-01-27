'use strict';
const Router = require('express').Router();
const controller = require('../controllers/UserController');

Router.post('/register', controller.registerUser);
Router.post('/', controller.login);

module.exports = Router;
