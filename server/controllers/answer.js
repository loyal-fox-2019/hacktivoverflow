const Answer = require('../models/answer')

class AnswerController {
  static all(req, res, next) {
    Answer.find()
      .then(answers => {
        res.send(answers)
      })
      .catch(next)
  }
  static question(req, res, next) {
    let questionId = req.params.id
    Answer.find({question: questionId})
      .then(answers => {
        res.send(answers)
      })
      .catch(next)
  }
  static create(req, res, next) {
    let { content } = req.body,
      author = req.user.id,
      question = req.params.id
    Answer.create({ content, author, question })
      .then(answer => {
        res.status(201).json(answer)
      })
  }
}

module.exports = AnswerController