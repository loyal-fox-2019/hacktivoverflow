const Answer = require('../models/answer')
const Question = require('../models/question')
const { ObjectId } = require('mongoose').Types
class ControllerQuestion {
  static create(req, res, next) {
    const data = {
      title: req.body.title,
      description: req.body.description,
      author: req.userInfo.id
    }
    Question.create(data)
      .then((result) => {
        res.status(201).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static find(req, res, next) {
    Question.find()
      .sort({ createdAt: -1 })
      .populate(['author', 'username'])
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static findOne(req, res, next) {
    Question.findById({
      _id: ObjectId(req.params.id)
    })
      .populate(['upvote', 'downvote', 'author'])
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static findOwn(req, res, next) {
    Question.find({
      author: ObjectId(req.userInfo.id)
    })
      .populate('author', 'username')
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static update(req, res, next) {
    const data = {
      title: req.body.title,
      description: req.body.description
    }
    Question.findOne(
      {
        $and: [
          {
            _id: ObjectId(req.params.id)
          },
          {
            author: ObjectId(req.userInfo.id)
          }
        ]
      },
      data
    )
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }

  static delete(req, res, next) {
    Question.findByIdAndDelete({
      _id: ObjectId(req.params.id)
    })
      .then((question) => {
        if (!question) {
          let err = {
            name: 'Not Found',
            message: 'Question not found'
          }
          next(err)
        }
        return Answer.deleteMany({
          question: ObjectId(req.params.id)
        })
      })
      .then((response) => {
        res.status(200).json(response)
      })
      .catch(next)
  }

  static upvote(req, res, next) {
    let questionData
    Question.findById({
      _id: ObjectId(req.params.id)
    })
      .then((question) => {
        questionData = question
        let unlike = question.downvotes
        let isUserAlreadyUnlike = unlike.includes(req.userInfo.id)

        if (isUserAlreadyUnlike) {
          return Question.findByIdAndUpdate(
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
        if (questionData.upvotes.includes(req.userInfo.id)) {
          return Question.findByIdAndUpdate(
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
          return Question.findByIdAndUpdate(
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
    let questionData
    Question.findById({
      _id: ObjectId(req.params.id)
    })
      .then((question) => {
        questionData = question
        let like = question.upvotes
        let isUserAlreadyLike = like.includes(req.userInfo.id)

        if (isUserAlreadyLike) {
          return Question.findByIdAndUpdate(
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
        if (questionData.downvotes.includes(req.userInfo.id)) {
          return Question.findByIdAndUpdate(
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
          return Question.findByIdAndUpdate(
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

module.exports = ControllerQuestion
