const Question = require('../models/question')

class QuestionController {
  static getAllQuestions(req, res, next) {
    Question.find({})
      .populate('owner', 'username avatar')
      .populate({
        path: 'answers.owner',
        select: 'username avatar',
      })
      .then(questions => {
        res.json({ questions })
      })
      .catch(next)
  }

  static addQuestion(req, res, next) {
    Question.create({
      title: req.body.title,
      description: req.body.description,
      owner: req.payload.id,
    })
      .then(question => {
        res.status(201).json({ message: 'Question created' })
      })
      .catch(next)
  }

  static editQuestion(req, res, next) {
    Question.findOne({ _id: req.params.questionId })
      .then(question => {
        question.title = req.body.title || question.title
        question.description = req.body.description || question.description

        return question.save()
      })
      .then(_ => {
        res.json({ message: 'Question edited' })
      })
      .catch(next)
  }

  static deleteQuestion(req, res, next) {
    Question.findOneAndRemove({ _id: req.params.questionId })
      .then(question => {
        res.json({ message: 'Question deleted' })
      })
      .catch(next)
  }
}

module.exports = QuestionController
