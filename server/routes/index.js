const express = require('express')
const route = express.Router()
const user = require('./users')
const question = require('./questions')
const answer = require('./answers')


route.use('/users',user)
route.use('/questions',question)
route.use('/answers',answer)

module.exports = route