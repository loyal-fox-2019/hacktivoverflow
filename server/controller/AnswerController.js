const Answer = require('../model/Answer')

class AnswerController
{
    static test(req,res)
      {
          res.send('Hello answer connected')
      }


    static postAnswer(req,res,next)
      {
          const { QuestionId, title, description } = req.body
          const AuthorId = req.decodedUser._id //id user
          const upVotes = 0, downVotes = 0
          const createdAt = new Date()

          Answer.create({
              AuthorId, QuestionId, title, description, upVotes, downVotes, createdAt
          })
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }
    

    static findAll(req,res,next)
      {
          Answer.find()
          .populate('AuthorId', '_id username')//id user
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
        
      }


    static findByQuestionId(req,res,next)
      {
        Answer.find(
          { QuestionId : req.params.questionid }
        )
        .populate('AuthorId', '_id username')
        .then(result=>{
          res.status(200).json(result)
        })
        .catch(err=>{
          next(err)
        })
      }



    static findAnswerOne(req,res,next)
      {
        Answer.findOne({
          _id:req.params.id
        })
        .then(result=>{
          res.status(200).json(result)
        })
        .catch(err=>{
          next(err)
        })
      }




    static findAllAnswerByUser(req,res,next)
      {


      }


    static putUpdate(req,res,next)
      {
        const { title, description } = req.body
        Answer.update(
          { _id: req.params.id},
          { title, description }
        )
        .then(result=>{
          res.status(200).json(result)
        })
        .catch(err=>{
          next(err)
        })


      }


    static patchVotes(req,res,next)
      {
          console.log("TCL: req.body.votesScript", req.body.votesScript)
          console.log("TCL: req.params.id", req.params.id)
          
          Answer.update(
              { _id:req.params.id},
                req.body.votesScript
          )
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }


    static deleteAnswer(req,res,next)
      {
        Answer.remove({
          _id:req.params.id
        })
        .then(result=>{
          res.status(200).json(result)
        })
        .catch(err=>{
          next(err)
        })
      }

    
    static MASTER_DELETE_ALL(req,res,next)
      {
        Answer.remove()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next(err)
        })
      }


}

module.exports = AnswerController