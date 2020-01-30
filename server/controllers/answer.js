const Answer = require('../models/Answer')

class AnswerController{
  static getAnswer(req, res, next){
    Answer
    .find({QuestionId: req.params.questionId})
    .populate('UserId', 'username')
    .sort('-upvotes -createdAt')
    .then((answers) => {
      res.status(200).json(answers)
    })
    .catch(next)
  }

  static vote(req, res, next){
    let { type } = req.body
    let query = {}
    if (type == 'up'){
      query = 
      {
        $addToSet: {upvotes: req.userData.id},
        $pull: {downvotes: req.userData.id}
      }
    }
    else if (type == 'down'){
      query = 
      {
        $addToSet: {downvotes: req.userData.id},
        $pull: {upvotes: req.userData.id}
      }      
    }
    let options = {
      new: true, omitUndefined: true
    }
    Answer
    .findByIdAndUpdate(req.params.answerId, query, options)
    .then((answer) => {
      res.status(200).json(answer)
    })
    .catch(next)
  }

  static create(req, res, next){
    let { description } = req.body
    let UserId = req.userData._id
    let QuestionId = req.params.questionId
    let answerObj = {description, UserId, QuestionId}
    Answer
    .create(answerObj)
    .then((answer) => {
      res.status(201).json(answer)
    })
    .catch(next)
  }

  static edit(req, res, next){
    let { description } = req.body
    let answerObj = {description}
    let options = {
      new: true, omitUndefined: true
    }
    Answer
    .findByIdAndUpdate(req.params.answerId, answerObj, options)
    .then((answer) => {
      res.status(200).json(answer)
    })
    .catch(next)
  }
}

module.exports = AnswerController