const express = require('express')
const router = express.Router()
const userRouter = require('./user-router')
const questionRouter = require('./question-router')
const answerRouter = require('./answer-router')
const error = require('../midlleware/errorhandle')

router.use('/users', userRouter)
router.use('/questions', questionRouter)
router.use('/answers', answerRouter)
router.use(error.errors)


module.exports = router



