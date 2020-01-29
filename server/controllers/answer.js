const Answer = require('../models/answer'),
  Question = require('../models/question')

class AnswerController {
  static all(req, res, next) {
    Answer.find()
      .then(answers => {
        res.send(answers)
      })
      .catch(next)
  }
  // static question(req, res, next) {
  //   let questionId = req.params.id
  //   Answer.find({question: questionId})
  //     .then(answers => {
  //       res.send(answers)
  //     })
  //     .catch(next)
  // }
  static destroy(req, res, next) {
    let id = req.params.id
    Answer.deleteOne({ _id: id })
      .then(result => {
        return Question.updateOne({ $in: { answers: id }}, { $pull: {answers: id}})
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }
  static create(req, res, next) {
    let { content } = req.body,
      author = req.user.id,
      question = req.params.id
    Answer.create({ content, author })
      .then(answer => {
        return Question.updateOne({ _id: question }, { $push: {answers: answer.id}})
        // res.status(201).json(answer)
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(next)
  }
  static async upvote(req, res, next) {
    // findOne
    // cek downvote kalau ada di pull trus push ke upvote
    // kalau ga ada, cek upvote
    //  kalau udah ada pull
    //  kalau ga ada push
    try {
      let id = req.params.id
      let answer = await Answer.findOne({ _id: id })
      if(!answer) {
        let err = new Error('NotFound')
        err.status = 404
        err.message = 'id not found'
        throw(err)
      } else if(answer.downvotes.includes(req.user.id)) {
        let pull = await Answer.updateOne({ _id: id }, { $pull: { downvotes: req.user.id } })
        let push = await Answer.updateOne({ _id: id }, { $push: { upvotes: req.user.id } })
        res.status(200).json(push)
      } else if(answer.upvotes.includes(req.user.id)) {
        let update = await Answer.updateOne({ _id: id }, { $pull: { upvotes: req.user.id } })
        res.status(200).json(update)
      } else {
        let update = await Answer.updateOne({ _id: id }, { $push: { upvotes: req.user.id } })
        res.status(201).json(update)
      }
    } catch (error) {
      next(error)
    }
  }
  static async downvote(req, res, next) {
    // findOne
    // cek upvote kalau ada di pull trus push ke downvotes
    // kalau ga ada, cek downvote
    //  kalau udah ada pull
    //  kalau ga ada push
    try {
      let id = req.params.id
      let answer = await Answer.findOne({ _id: id })
      if(!answer) {
        let err = new Error('NotFound')
        err.status = 404
        err.message = 'id not found'
        throw(err)
      } else if(answer.upvotes.includes(req.user.id)) {
        let pull = await Answer.updateOne({ _id: id }, { $pull: { upvotes: req.user.id } })
        let push = await Answer.updateOne({ _id: id }, { $push: { downvotes: req.user.id } })
        res.status(200).json(push)
      } else if(answer.downvotes.includes(req.user.id)) {
        let update = await Answer.updateOne({ _id: id }, { $pull: { downvotes: req.user.id } })
        res.status(200).json(update)
      } else {
        let update = await Answer.updateOne({ _id: id }, { $push: { downvotes: req.user.id } })
        res.status(201).json(update)
      }
    } catch (error) {
      next(error)
    }
  }

  static async update(req, res, next) {
    try {
      let { content } = req.body,
        id = req.params.id
      let answer = await Answer.findById(id)
      if(answer.upvotes.length != 0 || answer.downvotes.length != 0) {
        let err = new Error('Responded')
        err.status = 403
        err.message = 'you cant update an already responded answer'
        throw(err)
      } else {
        let update = await Answer.updateOne({ _id: id }, { content }, {runValidators: true})
        res.status(200).json(update)
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AnswerController