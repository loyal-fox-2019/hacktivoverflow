const Question = require('../models/Question')
const Answer = require('../models/Answer')

class QuestionController {
  static async getAll(req, res, next) {
    try {
      let filter = {}
      if (req.query) {
        for (const key in req.query) {
          filter[key] = req.query.key
        }
      }
      let question = await Question
        .find(filter)
        .populate('author')
        .populate('answers')
        .sort({updatedAt: -1})
      res.status(200).json(question)
    } catch (error) {
      next(error)
    }
  }

  static async getOne(req, res, next) {
    try {
      let question = await Question
        .findById(req.params.id)
        .populate('author')
        .populate('answers')
      res.status(200).json(question)
    } catch (error) {
      next(error)
    }
  }

  static async create(req, res, next) {
    try {
      const {title, content, tags} = req.body
      const author = req.decodedId
      let question = await Question.create({
        title,
        content,
        author,
        tags
      })
      res.status(201).json(question)
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      const id = req.params.id
      await Answer.deleteMany({Question: id})
      let question = await Question.findByIdAndDelete(id) 
      res.status(200).json(question)
    } catch (error) {
      next(error)
    }
  }

  static async vote(req, res, next) {
    const questionId = req.params.id
    const value = req.body.value
    const userId = req.decodedId
    let question = await Question.findById(questionId)
    if (question.author == userId) {
      next({status:400, message: "You cannot vote for your own question!"})
    } else {
      let vote = question.vote
        .filter(item => {
          return item.userId == req.decodedId
        })
      if (vote.length > 0) {
        if (vote[0].value == value) {
          vote[0].value = 0
          let result = await question.save()
          res.status(200).json(result)
        } else {
          vote[0].value = value
          let result = await question.save()
          res.status(200).json(result)
        }
      } else {
        question.vote.push({userId, value})
        let result = await question.save()
        res.status(200).json(result)
      }
    }
  }

  static edit(req, res, next) {
    try {
      const {title, content, tags} = req.body
      let question = Question
        .findByIdAndUpdate(req.params.id, 
          { title, content, tags },
          { new: true }
        )
      res.status(200).json(question)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = QuestionController