const route = require('express').Router()
const answer = require('./answer')
const question = require('./question')
const user = require('./user')
const errorHandler = require('../middlewares/errorHandler')

route.use('/user', user)

route.use('/answer', answer)

route.use('/question', question)

route.use(errorHandler)

module.exports = route