const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Question = require('../models/question')

module.exports = {
  authenticate: function(req, res, next) {
    if (!req.headers.token) {
      return next({ name: 'BadRequest', message: 'Missing token' })
    }

    try {
      const payload = jwt.verify(req.headers.token, process.env.JWT_SECRET)
      User.findOne({ _id: payload.id })
        .then(user => {
          if (!user) {
            throw { name: 'BadRequest', message: 'Bad token' }
          }

          req.payload = payload
          next()
        })
        .catch(next)
    } catch (err) {
      next(err)
    }
  },
  authorizeQuestion: function(req, res, next) {
    Question.findOne({ _id: req.params.questionId })
      .then(question => {
        if (!question) {
          throw { name: 'NotFound', message: 'Question not found' }
        }

        if (question.owner != req.payload.id) {
          throw { name: 'NotAuthorized', message: 'You are not authorize' }
        }

        next()
      })
      .catch(next)
  },
  authorizeAnswer: function(req, res, next) {
    Question.findOne({ _id: req.body.questionId })
      .then(question => {
        if (!question) {
          throw { name: 'NotFound', message: 'Question not found' }
        }

        const answer = question.answers.id(req.body.answerId)

        if (!answer) {
          throw { name: 'NotFound', message: 'Answer not found' }
        }

        if (answer.owner != req.payload.id) {
          throw { name: 'NotAuthorized', message: 'You are not authorize' }
        }

        next()
      })
      .catch(next)
  },
}
