const express = require('express')
const router = express.Router()

// router.get('/', )
router.use('/users', require('./users'))
router.use('/content', require('./content'))
// router.use('/transactions', require('./transaction'))

module.exports = router
