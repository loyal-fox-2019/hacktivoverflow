const Answer = require('../models/answer')
const Question = require('../models/question')
const { ObjectId } = require('mongoose').Types
class ControllerAnswer {
  static create(req, res, next) {
    Answer.create({
      question: req.body.question,
      description: req.body.description,
      user: req.userInfo.id
    })
      .then((answer) => {
        return Question.findByIdAndUpdate(req.body.question, {
          $push: {
            answers: answer._id
          }
        })
      })
      .then((question) => {
        res.status(201).json(question)
      })
      .catch((err) => {
        next(err)
      })
  }

  static find(req, res, next) {
    Answer.find({
      question: ObjectId(req.params.id)
    })
      .populate('user')
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static findOne(req, res, next) {
    Answer.findById({
      _id: ObjectId(req.params.id)
    })
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static findOwn(req, res, next) {
    Question.find({
      answers: {
        $gt: []
      }
    })
      .populate([
        {
          path: 'answers',
          populate: {
            path: 'user',
            match: { _id: ObjectId(req.userInfo.id) }
          }
        },
        'author'
      ])
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static update(req, res, next) {
    Answer.findByIdAndUpdate(
      {
        _id: ObjectId(req.params.id)
      },
      {
        description: req.body.description
      }
    )
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static upvote(req, res, next) {
    let answerData
    Answer.findById({
      _id: ObjectId(req.params.id)
    })
      .then((answer) => {
        answerData = answer
        let unlike = answer.downvotes
        let isUserAlreadyUnlike = unlike.includes(req.userInfo.id)

        if (isUserAlreadyUnlike) {
          return Answer.findByIdAndUpdate(
            { _id: ObjectId(req.params.id) },
            {
              $pull: {
                downvotes: req.userInfo.id
              }
            }
          )
        } else {
          return
        }
      })
      .then((result) => {
        if (answerData.upvotes.includes(req.userInfo.id)) {
          return Answer.findByIdAndUpdate(
            {
              _id: ObjectId(req.params.id)
            },
            {
              $pull: {
                upvotes: req.userInfo.id
              }
            }
          )
        } else {
          return Answer.findByIdAndUpdate(
            {
              _id: ObjectId(req.params.id)
            },
            {
              $push: {
                upvotes: req.userInfo.id
              }
            }
          )
        }
      })
      .then((result) => {
        res.status(201).send({
          message: 'Upvoted'
        })
      })
      .catch((err) => {
        next(err)
      })
  }

  static downvote(req, res, next) {
    let answerData
    Answer.findById({
      _id: ObjectId(req.params.id)
    })
      .then((answer) => {
        answerData = answer
        let like = answer.upvotes
        let isUserAlreadyLike = like.includes(req.userInfo.id)

        if (isUserAlreadyLike) {
          return Answer.findByIdAndUpdate(
            { _id: ObjectId(req.params.id) },
            {
              $pull: {
                upvotes: req.userInfo.id
              }
            }
          )
        } else {
          return
        }
      })
      .then((result) => {
        if (answerData.downvotes.includes(req.userInfo.id)) {
          return Answer.findByIdAndUpdate(
            {
              _id: ObjectId(req.params.id)
            },
            {
              $pull: {
                downvotes: req.userInfo.id
              }
            }
          )
        } else {
          return Answer.findByIdAndUpdate(
            {
              _id: ObjectId(req.params.id)
            },
            {
              $push: {
                downvotes: req.userInfo.id
              }
            }
          )
        }
      })
      .then((result) => {
        res.status(201).send({
          message: 'Downvoted'
        })
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = ControllerAnswer
