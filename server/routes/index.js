const express = require('express')
const route = express.Router()
const user = require('./users')
const question = require('./questions')
const answer = require('./answers')
const tags = require('./tags')


route.use('/users',user)
route.use('/questions',question)
route.use('/answers',answer)
route.use('/tags', tags)

module.exports = route