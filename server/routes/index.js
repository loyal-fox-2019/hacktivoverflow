"use strict"

const router = require('express').Router()
const userRouter = require('./user')
const answerRouter = require('./answers')
const questionRouter = require('./questions')

router.use('/users', userRouter)
router.use('/answers', answerRouter)
router.use('/questions', questionRouter)

module.exports = router