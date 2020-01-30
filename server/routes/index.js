const mainRouter = require('express').Router()

const userRouter = require('./user')

mainRouter.use('/user', userRouter)

const questionRouter = require('./question')

mainRouter.use('/questions', questionRouter)

const answerRouter = require('./answer')

mainRouter.use('/answers', answerRouter)

module.exports = mainRouter
