"use strict"

const router = require('express').Router()
const userRouter = require('./user')
const answerRouter = require('./answers')
const questionRouter = require('./questions')
const questionController = require('../controllers/Question')
const authentication = require('../middleware/authentication')

router.use('/users', userRouter)
router.use('/answers', answerRouter)
router.use('/questions', questionRouter)
router.use(authentication)
router.get('/user/questions', questionController.findQuestionUser)

module.exports = router