const Tag = require('../model/Tag')

class TagController{
    static test(req,res,next)
      {
        res.status(200).json({ tag : 'connected' })
      }

    static createUpdateTag(req,res,next)
      {
            console.log(`TCL: req.body    `, req.body    )

            let createTagArray = []
            let updateTagArray = []
        
            Tag.find({
                name : req.body.name
            })
            .then(result=>{
                let extractResultName = []
                result.forEach(element => {
                    extractResultName.push(element.name)
                });
                // console.log(`TCL: TagController -> extractResultName`, extractResultName)

        

                req.body.name.forEach(element => {
                    if(extractResultName.indexOf(element) === -1)
                        createTagArray.push(element)
                    else
                        updateTagArray.push(element)
                });
                // console.log(`TCL: TagController -> createTagArray`, createTagArray)
                // console.log(`TCL: TagController -> updateTagArray`, updateTagArray)


                if( createTagArray.length > 0)
                  {
                    let bulkWriteInsertOneScript = []

                    createTagArray.forEach(element => {
                        bulkWriteInsertOneScript.push({
                            insertOne: {
                                        "document" :{
                                                        name : element,
                                                        QuestionList : [req.body.QuestionId]
                                                    }
                                        }
                        })    
                    });
                    // console.log(`TCL: TagController -> bulkWriteInsertOneScript`, bulkWriteInsertOneScript)

                    return Tag.bulkWrite( bulkWriteInsertOneScript )
                  }
                else
                    return result
            })
            .then(result=>{
                if(updateTagArray.length > 0)
                  {
                    let bulkWritePushQuestionIdScript = []

                    updateTagArray.forEach(element => {
                        bulkWritePushQuestionIdScript.push({
                            updateOne : {
                                "filter" : { name : element },
                                "update" : {
                                              $addToSet : { QuestionList : req.body.QuestionId}
                                            }
                                        }
                        })
                    });
                    // console.log(`TCL: TagController -> bulkWritePushQuestionIdScript`, bulkWritePushQuestionIdScript)

                    return Tag.bulkWrite( bulkWritePushQuestionIdScript )
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
    
    static pullQuestionFromTag(req,res,next)
      {
            Tag.findOneAndUpdate(
                { name : req.params.tagName },
                { $pull : { 
                            QuestionList : { 
                                            $in: req.body.pull 
                                           }
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

    static masterFind(req,res,next)
      {
          Tag.find()
          .populate('QuestionList', 'title')
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })
        
      }

    static masterDelete(req,res,next)
      {
          Tag.remove()
          .then(result=>{
              res.status(200).json(result)
          })
          .catch(err=>{
              next(err)
          })

      }

}

module.exports = TagController