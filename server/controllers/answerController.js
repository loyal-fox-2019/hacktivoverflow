'use strict'

const Answer = require('../models/answer'),
      Question = require('../models/question')

module.exports = class AnswerController {
  static create(req, res, next) {
    let report;
    const { content, QuestionId } = req.body
    Answer.create({
      content,
      QuestionId,
      poster: req.decoded.id
    })
      .then(answer => {
        report = answer
        return Question.findByIdAndUpdate(
          QuestionId,
          { $inc: { answers: 1} },
          { new: true, runValidators: true, omitUndefined: true }
        )
      })
      .then(question => {
        res.status(201).json(report);
      })
      .catch(next);
  }

  static findOne(req, res, next) {
    Answer.findById(req.params.id)
      .populate('poster', 'name email')
      .populate('QuestionId')
      .then(answer => {
        res.status(200).json(answer);
      })
      .catch(next);
  }

  static vote(req, res, next) {
    let duplicate = 0
    Answer.findById(req.params.id)
      .then(answer => {
        if (answer) {
          if (req.query.vote.toLowerCase() === 'up') {
            answer.upvotes.forEach(user => {
              if (String(user) === String(req.decoded.id)) {
                duplicate++
              }
            })
            if (duplicate) {
              return Answer.findByIdAndUpdate(
                req.params.id,
                { $pull: { upvotes: req.decoded.id }
                }, { new: true })
            } else {
              return Answer.findByIdAndUpdate(
                req.params.id,
                { $addToSet: { upvotes: req.decoded.id },
                  $pull: { downvotes: req.decoded.id }
                }, { new: true })
            }
          } else if (req.query.vote.toLowerCase() === 'down') {
            answer.downvotes.forEach(user => {
              if (String(user) === String(req.decoded.id)) {
                duplicate++
              }
            })
            if (duplicate) {
              return Answer.findByIdAndUpdate(
                req.params.id,
                { $pull: { downvotes: req.decoded.id }
                }, { new: true })
            } else {
              return Answer.findByIdAndUpdate(
                req.params.id,
                { $addToSet: { downvotes: req.decoded.id },
                  $pull: { upvotes: req.decoded.id }
                }, { new: true })
            }
          } else {
            throw next({ status: 400, message: 'Invalid query!'})
          }
        } else {
          throw next({ status: 404, resource: 'Answer'})
        }
      })
      .then(answer => {
        res.status(200).json(answer);
      })
      .catch(next)
  }

  static update(req, res, next) {
    Answer.findOneAndUpdate(
      { _id: req.params.id } ,
      { content: req.body.content },
      { new: true, runValidators: true, omitUndefined: true }
    )
      .then(answer => {
        res.status(200).json(answer);
      })
      .catch(next);
  }

  static destroy(req, res, next) {
    Answer.findByIdAndDelete(req.params.id)
      .then(answer => {
        if (answer) {
          return Question.findByIdAndUpdate(
            answer.QuestionId,
            { $inc: { answers: -1} },
            { new: true, runValidators: true, omitUndefined: true }
          )
        } else {
          next({ status: 404, resource: 'Answer' })
        }
      })
      .then(() => {
        res.status(200).json({message: "Answer successfully deleted"});
      })
      .catch(next);
  }
}