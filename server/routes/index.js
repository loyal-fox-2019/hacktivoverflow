const router = require('express').Router()
const Question = require('./question')
const Answer = require('./answer')
const User = require('./user')

router.use('/user', User)
router.use('/question', Question)
router.use('/answer', Answer)

module.exports = router
