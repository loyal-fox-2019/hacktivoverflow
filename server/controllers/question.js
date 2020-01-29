const Question = require('../models/question'),
  Answer = require('../models/answer')

class QuestionController {
  static all(req, res, next) {
    Question.find()
      // .populate('author')
      .then(questions => {
        res.send(questions)
      })
      .catch(next)
  }
  static one(req, res, next) {
    let id = req.params.id
    Question.findById(id)
      .populate('author')
      .then(result => {
        res.send(result)
      })
      .catch(next)
  }
  static create(req, res, next) {
    let { title, content, tags } = req.body,
      author = req.user.id
    Question.create({ title, content, tags, author })
      .then(question => {
        res.status(201).json(question)
      })
      .catch(next)
  }
  // static checkUpdate(req, res, next) {
  //   let id = req.params.id
  //   Question.findById(id)
  //     .then(question => {
  //       if(question.upvotes.length != 0 || question.downvotes.length != 0) {
  //         next({status: 400, message: 'you cant update an already responded question'})
  //       } else {
  //          return Answer.findOne({question: id})
  //       }
  //     })
  //     .then(answer => {
  //       if(!answer) {
  //         res.send('ok')
  //       } else {
  //         next({status: 400, message: 'you cant update an answered question'})
  //       }
  //     })
  // }
  static async update(req, res, next) {
    try {
      let { title, content, tags } = req.body,
        id = req.params.id
      let question = await Question.findById(id)
      if(question.upvotes.length != 0 || question.downvotes.length != 0) {
        let err = new Error('Responded')
        err.status = 403
        err.message = 'you cant update an already responded question'
        throw(err)
      } else {
        let answer = await Answer.findOne({question: id})
        if(!answer) {
          let update = await Question.updateOne({ _id: id }, { title, content, tags }, {runValidators: true})
          res.send(update)
        } else {
          let err = new Error('Responded')
          err.status = 403
          err.message = 'you cant update an already ansewred question'
          throw(err)
        }
      }
    } catch (error) {
      next(error)
    }
  }

  static destroy(req, res, next) {
    let id = req.params.id
    Question.deleteOne({ _id: id })
      .then(result => {
        return Answer.deleteMany({ question: id })
      })
      .then(result => {
        res.status(200).json(result)
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
      let question = await Question.findOne({ _id: id })
      if(!question) {
        let err = new Error('NotFound')
        err.status = 404
        err.message = 'id not found'
        throw(err)
      } else if(question.downvotes.includes(req.user.id)) {
        let pull = await Question.updateOne({ _id: id }, { $pull: { downvotes: req.user.id } })
        let push = await Question.updateOne({ _id: id }, { $push: { upvotes: req.user.id } })
        res.status(200).json(push)
      } else if(question.upvotes.includes(req.user.id)) {
        let update = await Question.updateOne({ _id: id }, { $pull: { upvotes: req.user.id } })
        res.status(200).json(update)
      } else {
        let update = await Question.updateOne({ _id: id }, { $push: { upvotes: req.user.id } })
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
      let question = await Question.findOne({ _id: id })
      if(!question) {
        let err = new Error('NotFound')
        err.status = 404
        err.message = 'id not found'
        throw(err)
      } else if(question.upvotes.includes(req.user.id)) {
        let pull = await Question.updateOne({ _id: id }, { $pull: { upvotes: req.user.id } })
        let push = await Question.updateOne({ _id: id }, { $push: { downvotes: req.user.id } })
        res.status(200).json(push)
      } else if(question.downvotes.includes(req.user.id)) {
        let update = await Question.updateOne({ _id: id }, { $pull: { downvotes: req.user.id } })
        res.status(200).json(update)
      } else {
        let update = await Question.updateOne({ _id: id }, { $push: { downvotes: req.user.id } })
        res.status(201).json(update)
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = QuestionController