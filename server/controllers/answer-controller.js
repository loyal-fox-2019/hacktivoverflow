const Question = require('../models/question')

class AnswerController {
  static addAnswer(req, res, next) {
    Question.findOne({ _id: req.body.questionId })
      .then(question => {
        if (!question) {
          throw { name: 'NotFound', message: 'Question not found' }
        }

        question.answers.push({
          description: req.body.description,
          owner: req.payload.id,
        })

        return question.save()
      })
      .then(() => {
        res.status(201).json({ message: 'Answer added' })
      })
      .catch(next)
  }

  static editAnswer(req, res, next) {
    Question.findOne({ _id: req.body.questionId })
      .then(question => {
        const answer = question.answers.id(req.body.answerId)

        answer.description = req.body.description || answer.description

        return question.save()
      })
      .then(() => {
        res.json({ message: 'Answer edited' })
      })
      .catch(next)
  }

  static deleteAnswer(req, res, next) {
    Question.findOne({ _id: req.body.questionId })
      .then(question => {
        const answer = question.answers.id(req.body.answerId)

        answer.remove()

        return question.save()
      })
      .then(() => {
        res.json({ message: 'Answer removed' })
      })
      .catch(next)
  }
}

module.exports = AnswerController
