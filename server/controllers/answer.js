'use strict'

const { Answer, Question, User } = require('../models')

class answerController {
  static createAnswer(req, res, next) {
    const { description } = req.body
    const questionId = req.params.id
    const userId = req.decoded._id
    Answer.create({ description, questionId, userId })
      .then((answer) => {
        return Question.findByIdAndUpdate(
          { _id: answer.questionId },
          { $push: { answers: answer._id } }, { new: true })
      })
      .then((answer) => {
        res.status(201).json(answer)
      })
      .catch(next)
  }

  static read(req, res, next) {
    Answer.find()
      .populate('userId')
      .then((answer) => {
        res.status(200).json(answer)
      })
      .catch(next)
  }

  static readOne(req, res, next) {
    let _id = req.params.id
    Answer.find({ _id })
      .populate('userId')
      .then((answer) => {
        res.status(200).json(answer)
      })
      .catch(next)
  }

  static upVotes(req, res, next) {
    const answerId = req.params.id
    const userId = req.decoded._id
    Answer.findById(answerId)
      .then((answer) => {
        if (answer.upVotes.includes(userId)) {
          answer.upVotes.pull(userId)
          answer.save()
        } else {
          if (answer.downVotes.includes(userId)) {
            answer.downVotes.pull(userId)
          }
          answer.upVotes.push(userId)
          answer.save()
        }
        res.status(200).json(answer);
      })
      .catch(next)
  }

  static downVotes(req, res, next) {
    const answerId = req.params.id
    const userId = req.decoded._id
    Answer.findById(answerId)
      .then((answer) => {
        if (answer.downVotes.includes(userId)) {
          answer.downVotes.pull(userId)
          answer.save()
        } else {
          if (answer.upVotes.includes(userId)) {
            answer.upVotes.pull(userId)
          }
          answer.downVotes.push(userId)
          answer.save()
        }
        res.status(200).json(answer);
      })
      .catch(next)
  }
}

module.exports = answerController