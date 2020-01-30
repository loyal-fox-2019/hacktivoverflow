"use strict"

const express = require('express')
const router = express.Router()
const userRoute = require('./user')
const questionRoute = require('./question')
const answerRoute = require('./answer')

router.use('/user', userRoute)
router.use('/question', questionRoute)
router.use('/answer', answerRoute)

module.exports = router
