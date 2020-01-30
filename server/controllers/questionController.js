
const Question = require('../models/Question')
const Tag = require('../models/Tag')

class QuestionController {

   static async create(req, res, next) {
      try{
         let {title, description, tags} = req.body
   
         res.status(201).json(await Question.create({title, description, tags, user: req.decoded.userId}))
      }
      catch(error) {
         next(error)
      }
   }

   static async getAll(req, res, next) {

      try {
         const getQuery = Question.find()
            .populate('answers')
            .sort({createdAt: 'desc'})

         if(req.query.tag) {
            getQuery.where({tags: req.query.tag})
         }

         res.status(200).json({questions: await getQuery})   
      }
      catch(err) {
         next(err)
      }
   }

   static async getAllByTag(req, res, next) {
      try {
         const questions = await Question.find({tags: req.params.tag})
         res.status(200).json({questions})
      }
      catch (error) {
         next(error)
      }
   }

   static async getOne(req, res, next) {

      try{
         const question = await Question.findOne({_id: req.params.id})
            .populate('answers')
            .populate('user')
            .sort({updatedAt: 'desc'})

         res.status(200).json({question})
      }
      catch(error) {
         next(error)
      }
   }

   static async updateOne(req, res, next) {

      try {
         res.status(200).json({results: await Question.updateOne({_id: req.params.id}, req.body)})
      }
      catch(error) {
         next(error)
      }
   }

   static async removeTagFromQuestion(req, res, next) {
      try {
         const results = await Question.updateOne(
            {_id: req.params.id},
            {
               $pull: {
                  tags: req.body.tag 
               }
            }
         )

         res.status(200).json({results})
      }
      catch (error) {
         next(error)
      }
   }

   static async delete(req, res, next) {

      try {
         res.status(200).json({results: await Question.deleteOne({_id: req.params.id})})
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

         const question = await Question.findOne({_id: req.params.id}).select({votes: 1})

         let userVoteExist = false
         let userVoteExistIndex = -1

         for(let i in question.votes) {
            if(question.votes[i].userId == req.decoded.userId) {
               userVoteExist = true
               userVoteExistIndex = Number(i)
               break
            }
         }

         if(userVoteExist) {
            if(question.votes[userVoteExistIndex].voteType == voteType) {
               // delete the vote using splice
               question.votes.splice(userVoteExistIndex, 1)

               await Question.updateOne({_id: req.params.id}, {$set: {votes: question.votes}})
            }
            else {
               // update
               question.votes[userVoteExistIndex].voteType = voteType

               await Question.updateOne({_id: req.params.id}, {$set: {votes: question.votes}})
            }
         }
         else {
            // update
            question.votes.push({
               userId: req.decoded.userId,
               voteType
            })

            await Question.updateOne({_id: question._id}, {$set: {votes: question.votes}})
         }

         res.status(200).json(question)
      }
      catch(error) {
         next(error)
      }
   }
}

module.exports = QuestionController