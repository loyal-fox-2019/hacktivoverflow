const router = require('express').Router()
const userRouter = require('./users')
const questionRouter = require('./questions')

router.use('/', userRouter)
router.use('/questions', questionRouter)

module.exports = router
