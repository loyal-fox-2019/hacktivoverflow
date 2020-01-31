const router = require('express').Router(),
    userRouter = require('./user'),
    questionRouter = require('./question'),
    answerRouter = require('./answer')

router.use('/users', userRouter)

router.use('/questions', questionRouter)

router.use('/answers', answerRouter)

module.exports = router