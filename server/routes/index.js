'use strict';
const Router = require('express').Router();
const User = require('./user');
const Questions = require('./questions');

Router.use('/test', (req, res) => res.status(200).json({ ok }));
Router.use('/user', User);
Router.use('/questions', Questions);

module.exports = Router;