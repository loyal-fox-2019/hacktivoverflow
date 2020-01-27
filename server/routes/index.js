'use strict';
const Router = require('express').Router();
const User = require('./user');

Router.use('/test', (req, res) => res.status(200).json({ ok }));
Router.use('/user', User);

module.exports = Router;