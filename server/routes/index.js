const router = require('express').Router()
const userRouter = require('./users')
const questionRouter = require('./questions')
const answerRouter = require('./answers')
const tagRouter = require('./tags')

router.use('/', userRouter)
router.use('/questions', questionRouter)
router.use('/answers', answerRouter)
router.use('/tags', tagRouter)

module.exports = router
