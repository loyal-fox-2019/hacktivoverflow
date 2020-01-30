'use.strict';

const router = require('express').Router();
const UserController = require('../controllers/UserController');
const QuestionRouter = require('./QuestionRouter');

router.post('/login', UserController.login);
router.post('/register', UserController.register);

router.use('/question', QuestionRouter);

module.exports = router;