const jwt = require("jsonwebtoken");
const { User, Question, Answer } = require("../models");

function authentication(req, res, next) {
  if (req.headers.access_token) {
    let payload = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
    User.findOne({ email: payload.email})
      .then(user => {
        if (user) {
          req.decoded = payload;
          next()
        } else {
          throw { status: 401, message: 'Invalid access token' }
        }
      })
      .catch(next)
  } else {
    next({ status: 401, message: 'Invalid access token' })
  }
}

function questionAuthorization(req, res, next) {
  Question.findById(req.params.questionId)
    .then(question => {
      if (question.author == req.decoded._id) {
        next();
      } else {
        throw { status: 403, message: "Forbidden access" };
      }
    })
    .catch(next);
}

function answerAuthorization(req, res, next) {
  Answer.findById(req.params.answerId)
    .then(answer => {
      if (answer.author == req.decoded._id) {
        next();
      } else {
        throw { status: 403, message: "Forbidden access" };
      }
    })
    .catch(next);
}

module.exports = {
  authentication,
  questionAuthorization,
  answerAuthorization
}