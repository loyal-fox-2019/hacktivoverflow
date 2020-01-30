'use strict';

const express = require('express');
const routes = express.Router();
const UserController = require('../controllers/UserController');
const authentication = require('../middleware/authentication');

routes.post('/register', UserController.register);

routes.post('/login', UserController.login);

routes.get('/payload', UserController.getPayload);

module.exports = routes;