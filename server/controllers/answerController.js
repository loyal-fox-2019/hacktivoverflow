
const Question = require('../models/Question')
const Answer = require('../models/Answer')

class AnswerController {

   static async create(req, res, next) {

      try {
         const question = await Question.findOne({_id: req.params.questionId})
         let answer

         if(!question) throw {
            errorCode: 400,
            message: 'Question does not exist'
         }
         else {
            answer = await Answer.create({
               content: req.body.content,
               user: req.decoded.userId,
               question: req.params.questionId
            })

            question.answers.push(answer._id)

            await Question.updateOne({_id: req.params.questionId}, {answers: question.answers})
         }

         res.status(201).json({answer})
      }
      catch (error) {
         next(error)
      }
   }

   static async update(req, res, next) {

      try {
         const {content} = req.body

         res.status(200).json({results: await Answer.updateOne({_id: req.params.id}, {content})})
      }
      catch(error) {
         next(error)
      }
   }

   static async delete(req, res, next) {

      try {
         res.status(200).json({results: await Answer.deleteOne({_id: req.params.id})})
      }
      catch(error) {
         next(error)
      }
   }

   static async vote(req, res, next) {
      try {
         if(!req.query.voteType) throw {
            errorCode: 400,
            message: 'This action requires vote query'
         }

         let voteType = req.query.voteType

         const answer = await Answer.findOne({_id: req.params.id}).select({votes: 1})

         let userVoteExist = false
         let userVoteExistIndex = -1

         for(let i in answer.votes) {
            if(answer.votes[i].userId == req.decoded.userId) {
               userVoteExist = true
               userVoteExistIndex = Number(i)
               break
            }
         }

         if(userVoteExist) {
            if(answer.votes[userVoteExistIndex].voteType == voteType) {
               // delete the vote using splice
               answer.votes.splice(userVoteExistIndex, 1)

               await Answer.updateOne({_id: req.params.id}, {$set: {votes: answer.votes}})
            }
            else {
               // update
               answer.votes[userVoteExistIndex].voteType = voteType

               await Answer.updateOne({_id: req.params.id}, {$set: {votes: answer.votes}})
            }
         }
         else {
            // update
            answer.votes.push({
               userId: req.decoded.userId,
               voteType
            })

            await Answer.updateOne({_id: req.params.id}, {$set: {votes: answer.votes}})
         }

         res.status(200).json(answer)
      }
      catch(error) {
         next(error)
      }
   }

   static async getOne(req, res, next) {
      try {
         const answer = await Answer.findOne({_id: req.params.id}).populate('user')

         res.status(200).json({answer})
      }
      catch(error) {
         next(error)
      }
   }
}

module.exports = AnswerController