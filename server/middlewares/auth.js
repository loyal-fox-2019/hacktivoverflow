const jwt = require('jsonwebtoken')
const Question = require('../models/Question')
const Answer = require('../models/Answer')

function authentication(req, res, next) {
   try {
      console.log('point 1')
      if(!req.headers.token) throw {
         errorCode: 400,
         message: 'Invalid authentication: Please log in'
      }

      console.log('sampe sini')

      jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, decoded) => {
         if(err) throw {
            code: 400,
            message: 'Invalid authentication: Please log in'
         }
         else {
            req.decoded = decoded
            next()
         }
      })
   }
   catch (error) {
      next(error)
   }
}

function questionAuthorization(req, res, next) {
   
   Question
   .findOne({user: req.decoded.userId})
   .then(question => {
      if(!question || question.user != req.decoded.userId) throw {
         errorCode: 403,
         message: 'You are not authorized to perform this action'
      }
      else {
         next()
      }
   })
   .catch(next)
}

function answerAuthorization(req, res, next) {

   Answer
   .findOne({user: req.decoded.userId})
   .then(answer => {
      if(!answer || answer.user != req.decoded.userId) throw {
         errorCode: 403,
         message: 'You are not authorized to perform this action'
      }
      else {
         next()
      }
   })
   .catch(next)
}




module.exports = {authentication, questionAuthorization, answerAuthorization}