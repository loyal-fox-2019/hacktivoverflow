const express = require('express')
const router = express.Router()
const errorHandler = require('../middlewares/errorHandler');
const userRoute = require('./user');

router.use('/users', userRoute)
router.use(errorHandler)

module.exports = router