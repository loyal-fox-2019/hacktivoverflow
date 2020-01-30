const Question = require('../models/Question')

function authorizeQuestionOwner(req, res, next){
  Question
  .findById(req.params.questionId)
  .then((question) => {
    if (question){
      if (question.UserId == req.userData.id){
        next()
      }
      else {
        throw {errorCode: 401, errorMessage: 'You are not question owner'}
      }
    }
    else {
      throw {errorCode: 404, errorMessage: 'Question not found'}
    }
  })
  .catch(next)
}

module.exports = authorizeQuestionOwner