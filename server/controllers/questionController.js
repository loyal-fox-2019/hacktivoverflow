const Question = require('../models/question')

class QuestionController {
  static findAll(req, res, next) {
    Question.find()
      .populate('user_id')
      .then(results => {
        res.status(200).json(results)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static findOne(req, res, next) {
    Question.findById(req.params.id)
      .populate('user_id')
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static addView(req, res, next) {
    Question.updateOne({_id: req.params.id}, {$inc: {clicks: 1}})
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static findUserQuestion(req, res, next) {
    console.log('TEST')
    Question.find({ user_id: req.loggedIn.id })
      .then(results => {
        res.status(200).json(results)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static addQuestion(req, res, next) {
    const data = {
      title: req.body.title,
      content: req.body.content,
      user_id: req.loggedIn.id,
      clicks: 0,
      createdAt: new Date() + 7
    }
    Question.create(data)
      .then(result => {
        res.status(201).json({
          message: 'Question added',
          result
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Internal server error',
          err
        })
      })
  }

  static updateQuestion(req, res, next) {
    const id = req.params.id
    const data = {
      title: req.body.title,
      content: req.body.content
    }

    Question.updateOne({ _id: id }, data)
      .then(result => {
        if (result) {
          res.status(200).json({
            message: 'Question updated',
            result
          })
        } else {
          res.status(404).json({
            message: 'Question not found'
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          message: 'Internal server error'
        })
      })
  }

  static updateVote(req, res, next) {
    let questionId = req.params.id
    let id = req.loggedIn.id
    let data = null

    Question.findById(questionId)
      .then(result => {
        data = result
        if (result.downvote.includes(id)) {
          return Question.updateOne(
            { _id: questionId },
            { $pull: { downvote: id } }
          )
        } else {
          return
        }
      })
      .then(() => {
        if (data.upvote.includes(id)) {
          return Question.updateOne(
            { _id: questionId },
            { $pull: { upvote: id } }
          )
        } else {
          return Question.updateOne(
            { _id: questionId },
            { $push: { upvote: id } }
          )
        }
      })
      .then(result => {
        res.status(200).json({
          message: 'Vote updated',
          result
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message: 'Internal server error'
        })
      })
  }

  static downvote(req, res, next) {
    let questionId = req.params.id
    let id = req.loggedIn.id
    let data = null

    Question.findById(questionId)
      .then(result => {
        data = result
        if (result.upvote.includes(id)) {
          return Question.updateOne(
            { _id: questionId },
            { $pull: { upvote: id } }
          )
        } else {
          return
        }
      })
      .then(() => {
        if (data.downvote.includes(id)) {
          return Question.updateOne(
            { _id: questionId },
            { $pull: { downvote: id } }
          )
        } else {
          return Question.updateOne(
            { _id: questionId },
            { $push: { downvote: id } }
          )
        }
      })
      .then(result => {
        res.status(200).json({
          message: 'Vote updated',
          result
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message: 'Internal server error'
        })
      })
  }

  static deleteOne(req, res, next) {
    const id = req.params.id
    Question.findByIdAndDelete(id)
      .then(result => {
        res.status(200).json({
          message: 'Question Deleted',
          result
        })
      })
      .catch(err => {
        res.status(404).json(err)
      })
  }
}

module.exports = QuestionController
