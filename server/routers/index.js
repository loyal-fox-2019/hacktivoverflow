const router = require('express').Router();
const routerUser = require('./user');
const routerQuestion = require('./question');
const routerAnswer = require('./answer');

router.use('/users', routerUser);
router.use('/questions', routerQuestion);
router.use('/answers', routerAnswer);

module.exports = router;