const express = require('express')
const router = express.Router()
const errorHandler = require('../middlewares/errorHandler');
const userRoute = require('./user');
const questionRoute = require('./question');
const voteRoute = require('./vote');

router.use('/users', userRoute)
router.use('/questions', questionRoute)
router.use('/votes', voteRoute)
router.use(errorHandler)

module.exports = router