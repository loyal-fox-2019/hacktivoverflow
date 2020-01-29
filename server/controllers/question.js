const Question = require('../models/question')

class QuestionController {
  static all(req, res, next) {
    Question.find()
      // .populate('author')
      .then(questions => {
        res.send(questions)
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
}

module.exports = QuestionController