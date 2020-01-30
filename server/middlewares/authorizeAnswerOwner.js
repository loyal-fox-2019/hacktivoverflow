const Answer = require('../models/Answer')

function authorizeAnswerOwner(req, res, next){
  Answer
  .findById(req.params.answerId)
  .then((answer) => {
    if (answer){
      if (answer.UserId == req.userData.id){
        next()
      }
      else {
        throw {errorCode: 401, errorMessage: 'You are not answer owner'}
      }
    }
    else {
      throw {errorCode: 404, errorMessage: 'Answer not found'}
    }
  })
  .catch(next)
}

module.exports = authorizeAnswerOwner