const Question = require('../model/Question')
const Answer = require('../model/Answer')

class QuestionController
{
    static test(req,res)
      {
          res.send('Hello question connected')
      }


    static createQuestion(req,res,next)
      {
        console.log("TCL: req.decodedUser", req.decodedUser)

        const { title, description, TagList } = req.body
        console.log(`TCL: req.body`, req.body)

        Question.create({
            title, description, TagList,
            AuthorId : req.decodedUser._id,
            upVotes : [], 
            downVotes: [], 
            createdAt: new Date()
        })
        .then(result=>{
            console.log(`TCL: result`, result)
            res.status(200).json(result)
        })
        .catch(err=>{
            next(err)
        })
        
      }


    static findAllQuestion(req,res,next)
      {
          Question.find()
          .populate('AuthorId', 'username _id')
          .sort([
              ['createdAt', 'desc']
          ])
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }


    static findQuestionById(req,res,next)
      {
          const { id } = req.params
          console.log("TCL: req.params.id", req.params.id)
          console.log("TCL: id", id)
          Question.findOne({
              _id:id
          })
          .populate('AuthorId', '_id username')
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }


    //WORKING
    static pushUpVotes(req,res,next)
      {
          Question.update(
              { _id:req.body.QuestionId },
              { $push: {
                //   'upVotes': req.body.name,
                //   downVotes: req.body.name
                },
                $pull: {
                //   'upVotes': req.body.name,
                  downVotes: req.body.name
                }
              }
          )
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }


    static filterSearch(req,res,next)
      {
          const validKey = ['TagList', 'title']
          let updateQuery = {}
          
          validKey.forEach(element => {
              if(req.body[element])
                {
                  if(element === 'title')
                    updateQuery[element] = new RegExp(req.body[element], 'i')
                  else
                    updateQuery[element] = req.body[element]
                }
          });
        

          Question.find(
              updateQuery
          )
          .populate('AuthorId', 'username')
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }



    static putUpdate(req,res,next)
      {
          const { title, description, push, pull } = req.body
        
          let updateScript = { title, description }

          if(push){
              updateScript.$addToSet = { 
                                        TagList : {
                                                    $each : push
                                                  }
                                       }
          }
        //   console.log(`TCL: updateScript`, updateScript)

          Question.updateOne(
              { _id: req.params.id},
              updateScript
          )
          .then(result=>{
                if(pull){
                    return Question.updateOne(
                        { _id: req.params.id},
                        {$pull : { 
                                TagList : { 
                                            $in:pull
                                          }
                        }}
                    )
                }
                else
                    res.status(200).json(result)
          })
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
      }


    static pullUpVotes(req,res,next)
      {
          Question.update(
              { _id:req.body.QuestionId },
              { $pull: {
                  'upVotes': req.body.name
              }}
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
          
          Question.update(
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


    static deleteQuestion(req,res,next)
      {
        //   delete quesiton JUGA SEKLIAN DELETE ANSWERNYA
        // res.send('jalan deletequestion')
        Question.remove({
            _id:req.params.id
        })
        .then(result=>{
            console.log('TCL \n============\n Success to Delete', result)

            return Answer.remove({
                QuestionId: req.params.id
            })
        })
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next(err)
        })

        
      }


    static masterDelete(req,res,next)
      {
          Question.remove()
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })

      }

}

module.exports = QuestionController