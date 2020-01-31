const express = require('express')
const router = express.Router()
const userRouter = require('./userRoutes')
const questionRouter = require('./questionRoutes')
const answerRouter = require('./answerRoutes')

router.use('/account', userRouter)
router.use('/questions', questionRouter)
router.use('/answers', answerRouter)

module.exports = router