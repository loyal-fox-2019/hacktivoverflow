const router = require('express').Router();
const user = require('./userRoute.js');
const question = require('./questionRoute');
const answer = require('./answerRoute');
const authenticator = require('../middlewares/authenticator');

router.use('/users', user)
router.use(authenticator)
router.use('/answers', answer )
router.use('/questions', question )

module.exports = router