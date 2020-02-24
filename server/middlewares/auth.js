const {verifyToken} = require('../helpers/jwt')
const User = require('../models/User')
const Question = require('../models/Question')
const Answer = require('../models/Answer')

module.exports = {
  async authenticate(req, res, next) {
    try {
      let { id } = verifyToken(req.headers.token)
      let user = await User.findById(id)
      if(user) {
        req.decodedId = id
        next()
      } else {
        next({status: 401, message: 'Authentication failed'})
      }
    } catch (error) {
      next(error)
    }
  },
  async authorizeQuestion(req, res, next) {
    try {
      let question = await Question.findById(req.params.id)
      if (question) {
        if (question.author == req.decodedId) next() 
        else next({status:401, message: 'You are unauthorized!'})
      } else {
        next({status:404, message: 'Question not found!'})
      }
    } catch (error) {
      
    }
  },
  async authorizeAnswer(req, res, next) {
    try {
      let answer = await Answer.findById(req.params.id)
      if (answer) {
        if (answer.author == req.decodedId) next() 
        else next({status:401, message: 'You are unauthorized!'})
      } else {
        next({status:404, message: 'Answer not found!'})
      }
    } catch (error) {
      
    }
  }
}