const {verifyToken} = require('../helpers/jwt'),
      User = require('../models/user'),
      Question = require('../models/question')
      Answer = require('../models/answer')

module.exports = {
  authentication(req, res, next) {
    if (req.headers.hasOwnProperty('access_token')) {
      try{
        req.decoded = verifyToken(req.headers.access_token)
        User.findById(req.decoded.id)
          .then(user => {
            if (user) {
              next()
            } else {
              next({ status: 401, message: 'Invalid access' })
            }
          })
          .catch(next)
      } catch (err) {
        next(err)
      }
    } else {
      next({ status: 400, message: 'Please provide access token or log in to get one' })
    }
  },

  questionAuthorization(req, res, next) {
    Question.findById(req.params.id)
      .then(data => {
        console.log(data)
        if (data) {
          if (String(data.poster) === String(req.decoded.id)) {
            next();
          } else {
            next({ status: 403, message: "Unauthorized process" });
          }
        } else {
          next({ status: 404, resource: 'Question' });
        }
      })
      .catch(next);
  },

  answerAuthorization(req, res, next) {
    Answer.findById(req.params.id)
      .then(data => {
        console.log(data)
        if (data) {
          if (String(data.poster) === String(req.decoded.id)) {
            next();
          } else {
            next({ status: 403, message: "Unauthorized process" });
          }
        } else {
          next({ status: 404, resource: 'Answer' });
        }
      })
      .catch(next);
  }
}

