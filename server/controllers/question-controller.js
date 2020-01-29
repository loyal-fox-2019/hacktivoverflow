const Question = require('../models/question')

class QuestionController {
  static getAllQuestions(req, res, next) {
    Question.find({})
      .select('-votes._id -votes.owner')
      .populate('owner', 'username avatar')
      .then(results => {
        const questions = results.map(result => {
          return {
            _id: result.id,
            title: result.title,
            description: result.description,
            owner: result.owner,
            votes: result.votes,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
            answers: result.answers.length,
          }
        })
        res.json(questions)
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }

  static getQuestionDetail(req, res, next) {
    Question.findOne({ _id: req.params.questionId })
      .select('-votes._id -votes.owner -answers.votes._id -answers.votes.owner')
      .populate('owner', 'username avatar')
      .populate('answers.owner', 'username avatar')
      .then(question => {
        if (!question) {
          throw { name: 'NotFound', message: 'Question not found' }
        }

        res.json({ question })
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
      .then(() => {
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
