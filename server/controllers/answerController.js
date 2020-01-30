const Answer = require('../models/answer')
const Question = require('../models/question')

class AnswerController {
  static getAll(req, res, next) {
    const id = req.params.id
    Answer.find({ question: id })
      .populate('user_id')
      .then(results => {
        console.log(results)
        res.status(200).json(results)
      })
      .catch(err => {
        res.status(404).json(err)
      })
  }

  static getOne(req, res, next) {
    const id = req.params.id
    Answer.findById(id)
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static addAnswer(req, res, next) {
    const data = {
      content: req.body.content,
      user_id: req.loggedIn.id,
      question: req.params.id
    }
    Answer.create(data)
      .then(result => {
        console.log(result)
        return Question.updateOne(
          { _id: data.question },
          { $push: { answer: result._id } }
        )
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        res.status(403).json(err)
      })
  }

  static updateAnswer(req, res, next) {
    const data = {
      content: req.body.content
    }
    Answer.updateOne({ _id: req.params.id }, data)
      .then(result => {
        if (result) {
          res.status(200).json(result)
        } else {
          res.status(404).json({
            message: 'Data not found'
          })
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static updateVote(req, res, next) {
    let answerId = req.params.id
    let id = req.loggedIn.id
    let data = null

    Answer.findById(answerId)
      .then(result => {
        data = result
        if (result.downvote.includes(id)) {
          return Answer.updateOne(
            { _id: answerId },
            { $pull: { downvote: id } }
          )
        } else {
          return
        }
      })
      .then(() => {
        if (data.upvote.includes(id)) {
          return Answer.updateOne({ _id: answerId }, { $pull: { upvote: id } })
        } else {
          return Answer.updateOne({ _id: answerId }, { $push: { upvote: id } })
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
    let answerId = req.params.id
    let id = req.loggedIn.id
    let data = null

    Answer.findById(answerId)
      .then(result => {
        data = result
        if (result.upvote.includes(id)) {
          return Answer.updateOne({ _id: answerId }, { $pull: { upvote: id } })
        } else {
          return
        }
      })
      .then(() => {
        if (data.downvote.includes(id)) {
          return Answer.updateOne(
            { _id: answerId },
            { $pull: { downvote: id } }
          )
        } else {
          return Answer.updateOne(
            { _id: answerId },
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
}

module.exports = AnswerController
