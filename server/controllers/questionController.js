'use strict'

const Question = require('../models/question'),
      questErr = { status: 404, resource: 'Question' }

module.exports = class QuestionController {
  static create(req, res, next) {
    const { title, content } = req.body
    let tagsArr = [];
    req.body.tags.split(',').forEach(tag => {
      if (!tagsArr.includes(tag)) {
        tagsArr.push(tag)
      }
    })
    Question.create({
      title,
      content,
      tags: tagsArr,
      poster: req.decoded.id
    })
      .then(question => {
        res.status(201).json(question);
      })
      .catch(next);
  }

  static findAll(req, res, next) {
    Question.find({})
      .populate('poster', 'name email')
      .then(questions => {
        res.status(200).json(questions);
      })
      .catch(next);
  }

  static findOne(req, res, next) {
    let answersArr = []
    Answer.find({ QuestionId: req.params.id })
      .populate('poster', 'name email')
      .then(answers => {
        answersArr = answers
        return Question.findById(req.params.id)
      })
      .then(question => {
        if (!question) {
          next(questErr)
        } else {
          let report = {
            answers: answersArr,
            _id: question._id,
            upvotes: question.upvotes,
            downvotes: question.downvotes,
            title: question.title,
            content: question.content,
            poster: question.poster,
            tags: question.tags,
            createdAt: question.createdAt,
            updatedAt: question.updatedAt,
          }
          res.status(200).json(report);
        }
      })
      .catch(next);
  }

  static filter(req, res, next) {
    Question.find({ title: new RegExp(req.params.keyword, "i")})
      .populate('poster', 'name email')
      .then(questions => {
        res.status(200).json(questions);
      })
      .catch(next);
  }

  static filterQuestionByTag(req, res, next) {
    Question.find({ tags: req.params.keyword })
      .populate('poster', 'name, email')
      .then(questions => {
        res.status(200).json(questions)
      })
      .catch(next)    
  }

  static vote(req, res, next) {
    let duplicate = 0
    Question.findById(req.params.id)
      .then(question => {
        if (question) {
          if (req.query.vote.toLowerCase() === 'up') {
            question.upvotes.forEach(user => {
              if (String(user) === String(req.decoded.id)) {
                duplicate++
              }
            })
            if (duplicate) {
              return Question.findByIdAndUpdate(
                req.params.id,
                { $pull: { upvotes: req.decoded.id }
                }, { new: true })
            } else {
              return Question.findByIdAndUpdate(
                req.params.id,
                { $addToSet: { upvotes: req.decoded.id },
                  $pull: { downvotes: req.decoded.id }
                }, { new: true })
            }
          } else if (req.query.vote.toLowerCase() === 'down') {
            question.downvotes.forEach(user => {
              if (String(user) === String(req.decoded.id)) {
                duplicate++
              }
            })
            if (duplicate) {
              return Question.findByIdAndUpdate(
                req.params.id,
                { $pull: { downvotes: req.decoded.id }
                }, { new: true })
            } else {
              return Question.findByIdAndUpdate(
                req.params.id,
                { $addToSet: { downvotes: req.decoded.id },
                  $pull: { upvotes: req.decoded.id }
                }, { new: true })
            }
          } else {
            throw next({ status: 400, message: 'Invalid query!'})
          }
        } else {
          throw next({ status: 404, resource: 'Question'})
        }
      })
      .then(question => {
        res.status(200).json(question);
      })
      .catch(next)
  }

  static update(req, res, next) {
    let { title, content } = req.body
    Question.findOneAndUpdate(
      { _id: req.params.id },
      { title, content },
      { new: true, runValidators: true, omitUndefined: true }
    )
      .then(question => {
        res.status(200).json(question);
      })
      .catch(next);
  }

  static destroy(req, res, next) {
    Question.findByIdAndDelete(req.params.id)
      .then(() => {
        return Answer.deleteMany({ QuestionId: req.params.id })
      })
      .then(() => {
        res.status(204).json({message: "Question successfully deleted"});
      })
      .catch(next);
  }

  static findTags(req, res, next) {
    // console.log('MASUK CONTROLLER')
    let tagsArr = []
    Question.find({})
      .then(questions => {
        questions.forEach(question => {
          question.tags.forEach(tag => {
            if (!tagsArr.includes(tag)) {
              tagsArr.push(tag)
            }
          })
        })
        res.status(200).json(tagsArr)
      })
      .catch(next)    
  }

  static filterTags(req, res, next) {
    let tagsArr = []
    Question.find({})
      .then(questions => {
        questions.forEach(question => {
          question.tags.forEach(tag => {
            if (!tagsArr.includes(tag) && tag.toLowerCase().includes(req.params.keyword.toLowerCase())) {
              tagsArr.push(tag)
            }
          })
        })
        res.status(200).json(tagsArr)
      })
      .catch(next)    
  }

}