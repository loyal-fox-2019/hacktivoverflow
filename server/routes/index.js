const router = require('express').Router()

router.use('/user', require('./userRoutes'))
router.use('/question', require('./questionRoutes'))

module.exports = router