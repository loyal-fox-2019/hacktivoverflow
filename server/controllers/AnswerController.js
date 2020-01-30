const Answer = require('../models/Answer')
const Question = require('../models/Question')

class AnswerController {
  static async getAll(req, res, next) {
    try {
      let answer = await Answer.find({author:req.decodedId})
        .populate('Question')
      res.status(200).json(answer)
    } catch (error) {
      next(error)
    }
  }
  static async create(req, res, next) {
    try {
      const { content } = req.body
      const author = req.decodedId
      const question = req.params.QuestionId
      let answer = await Answer.create({      
        content,
        author,
        question
      })
      await Question
        .findByIdAndUpdate(req.params.questionId, 
          {$addToSet: {answer: answer._id}}
        )
      res.status(201).json({message: 'Answer submitted!'})
    } catch (error) {
      next(error)
    }
  }
  static async vote(req, res, next) {
    const answerId = req.params.id
    const value = req.body.value
    const userId = req.decodedId
    let answer = await Answer.findById(answerId)
    if (answer.author == userId) {
      next({status:400, message: "You cannot vote for your own answer!"})
    } else {
      let vote = answer.vote
        .filter(item => {
          return item.userId == req.decodedId
        })
      if (vote.length > 0) {
        if (vote[0].value == value) {
          vote[0].value = 0
          let result = await answer.save()
          res.status(200).json(result)
        } else {
          vote[0].value = value
          let result = await answer.save()
          res.status(200).json(result)
        }
      } else {
        answer.vote.push({userId, value})
        let result = await answer.save()
        res.status(200).json(result)
      }
    }
  }
  static async delete(req, res, next) {
    try {
      let answer = await Answer
        .findByIdAndDelete(req.params.id)
      res.status(200).json(answer)
    } catch (error) {
      next(error)
    }
  }
  static async edit(req, res, next) {
    try {
      const {content} = req.body
      let answer = await Answer
      .findByIdAndUpdate(req.params.id, 
        { content },
        { new: true }
      )
      res.status(200).json(answer)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AnswerController