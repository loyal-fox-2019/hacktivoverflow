const Question = require('../models/question')

class QuestionController {
  static addQuestion(req, res, next) {
    const data = {
      title: req.body.title,
      content: req.body.content,
      user_id: req.loggedIn.id,
      upvote: 0,
      downvote: 0,
      clicks: 0
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
    let vote = req.params.vote
    let newVal = {}
    Question.findById(req.params.id)
      .then(result => {
        if (vote == 'upvote') {
          newVal[vote] = result.upvote + 1
          return Question.updateOne(
            { _id: req.params.id },
            { $set: { newVal } }
          )
        } else if (vote == 'downvote') {
          newVal[vote] = result.upvote - 1
          return Question.updateOne(
            { _id: req.params.id },
            { $set: { newVal } }
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
        res.status(500).json({
          message: 'Internal server error'
        })
      })
  }

  static downvote(req, res, next) {
    let newVal = null
    Question.findById(req.params.id)
      .then(result => {
        newVal = result.downvote + 1
        return Question.updateOne(
          { _id: req.params.id },
          { $set: { downvote: newVal } }
        )
      })
      .then(result => {
        res.status(200).json({
          message: 'Vote updated',
          result
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Internal server error'
        })
      })
  }
}
