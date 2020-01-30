const router = require('express').Router()

router.use('/user', require('./userRoutes'))
router.use('/question', require('./questionRoutes'))
router.use('/answer', require('./answerRoutes'))

module.exports = router