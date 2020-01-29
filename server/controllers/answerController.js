'use strict'

const Answer = require('../models/answer')

module.exports = class AnswerController {
  static create(req, res, next) {
    const { title, content, QuestionId } = req.body
    Answer.create({
      title,
      content,
      QuestionId,
      poster: req.decoded.id
    })
      .then(answer => {
        res.status(201).json(answer);
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
    let isUpvoted = 0;
    Answer.findById(req.params.id)
      .then(answer => {
        answer.upvotes.forEach(user => {
          if (String(user) === String(req.decoded.id)) {
            isUpvoted++
          }
        })
        if (isUpvoted > 0) {
          return Answer.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { downvotes: req.decoded.id },
              $pull: { upvotes: req.decoded.id }
            }, { new: true }
          )
        } else {
          return Answer.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { upvotes: req.decoded.id },
              $pull: { downvotes: req.decoded.id }
            }, { new: true }
          )
        }
      })
      .then(answer => {
        res.status(200).json(answer);
      })
      .catch(next);
  }

  static update(req, res, next) {
    let { title, content } = req.body
    Answer.findOneAndUpdate(
      { _id: req.params.id } ,
      { title, content },
      { new: true, runValidators: true, omitUndefined: true }
    )
      .then(answer => {
        res.status(200).json(answer);
      })
      .catch(next);
  }

  static destroy(req, res, next) {
    Answer.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(204).json({message: "Answer successfully deleted"});
      })
      .catch(next);
  }
}