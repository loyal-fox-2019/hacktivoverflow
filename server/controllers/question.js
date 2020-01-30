const Question = require('../models/Question')
const Answer = require('../models/Answer')

class QuestionController{
  static showAll(req, res, next){
    Question
    .find({})
    .populate('UserId', 'username -_id')
    .sort('-createdAt')
    .then((questions) => {
      res.status(200).json(questions)
    })
    .catch(next)
  }

  static searchTag(req, res, next){
    Question
    .find({tags: req.query.search})
    .populate('UserId')
    .then((questions) => {
      res.status(200).json(questions)
    })
    .catch(next)
  }

  static showOne(req, res, next){
    Question
    .findById(req.params.questionId)
    .populate('UserId')
    .then((question) => {
      if (!question){
        throw {errorCode: 404, errorMessage: 'Question not found'}
      }
      else {
        res.status(200).json(question)
      }
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
    Question
    .findByIdAndUpdate(req.params.questionId, query, options)
    .then((question) => {
      res.status(200).json(question)
    })
    .catch(next)
  }

  static create(req, res, next){
    let { title, description, tags } = req.body
    let questionObj = {title, description, tags, UserId: req.userData._id}
    Question
    .create(questionObj)
    .then((question) => {
      res.status(201).json(question)
    })
    .catch(next)
  }

  static edit(req, res, next){
    let { title, description, tags } = req.body
    let questionId = req.params.questionId
    let questionObj = {title, description, tags}
    let options = {
      new: true, omitUndefined: true
    }
    Question
    .findByIdAndUpdate(questionId, questionObj, options)
    .then((question) => {
      res.status(200).json(question)
    })
    .catch(next)
  }

  static delete(req, res, next){
    let questionObj = {}
    Question
    .findByIdAndDelete(req.params.questionId)
    .then((question) => {
      questionObj = question
      return Answer
      .deleteMany({QuestionId: req.params.questionId})
    })
    .then(() => {
      res.status(200).json(questionObj)
    })
    .catch(next)
  }

}

module.exports = QuestionController