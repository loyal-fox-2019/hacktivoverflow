'use strict'

const { Question, Answer } = require('../models')

class questionController {
  static createQuestion(req, res, next) {
    let userId = req.decoded.id
    const { title, description } = req.body
    Question.create({ title, description, userId })
      .then((question) => {
        res.status(201).json(question)
      })
      .catch(next)
  }

  static editQuestion(req, res, next) {
    let id = req.params.id
    let { title, description } = req.body
    let value = {
      title, description
    }

    Question
      .findByIdAndUpdate(id, value, { new: true, omitUndefined: true })
      .then((question) => {
        res.status(200).json(question)
      })
      .catch(next)
  }

  static deleteQuestion(req, res, next) {
    const id = req.params.id
    Question.findByIdAndDelete(id)
      .then((question) => {
        let value = {
          _id: question.answers
        }
        return Answer.deleteMany(value)
      })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static readAllQuestion(req, res, next) {
    console.log('masuk')
    Question.find()
      .populate('answers')
      .populate('userId')
      .then((question) => {
        res.status(200).json(question)
      })
      .catch(next)
  }

  static readMyQuestion(req, res, next) {
    const id = req.decoded._id
    console.log('asdasdasdasdasdasdd')
    Question.find({ userId: id })
      .populate('userId')
      .populate('answers')
      .then((data) => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static readOneQuestion(req, res, next) {
    const id = req.params.id
    Question.findById(id)
      .populate('userId')
      .populate('answers')
      .then((data) => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static upVotes(req, res, next) {
    const questionId = req.params.id
    const userId = req.decoded._id
    Question.findById(questionId)
      .then((question) => {
        if (question.upVotes.includes(userId)) {
          question.upVotes.pull(userId)
          question.save()
        } else {
          if (question.downVotes.includes(userId)) {
            question.downVotes.pull(userId)
          }
          question.upVotes.push(userId)
          question.save()
        }
      })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(next)
  }

  static downVotes(req, res, next) {
    const questionId = req.params.id
    const userId = req.decoded._id
    Question.findById(questionId)
      .then((question) => {
        if (question.downVotes.includes(userId)) {
          question.downVotes.pull(userId)
          question.save()
        } else {
          if (question.upVotes.includes(userId)) {
            question.upVotes.pull(userId)
          }
          question.downVotes.push(userId)
          question.save()
        }
      })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(next)
  }
}

module.exports = questionController