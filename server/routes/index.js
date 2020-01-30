const express = require('express')
const router = express.Router()
const userRoutes = require('./user')
const questionRoutes = require('./question')
const answerRoutes = require('./answer')

router.use('/users', userRoutes)
router.use('/questions', questionRoutes)
router.use('/answers', answerRoutes)

module.exports = router