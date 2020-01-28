const express = require('express');
const router = express.Router();
const auth = require('./auth')
const users = require('./users')
const questions = require('./questions')
const answers = require('answers')
const tags = require('./tags')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hello world')
});

router.use('auth', auth)
router.use('users', users)
router.use('questions', questions)
router.use('answers', answers)
router.use('tags', tags)

module.exports = router;
