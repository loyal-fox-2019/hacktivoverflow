const Question = require('../models/question')

class questionController {
    static create ( req,res,next ) {
        let tags = req.body.tags.split(' ')
        Question.create({
            name:req.body.name,
            description:req.body.description,
            votes:[],
            author: req.decoded.id,
            answers:[],
            tags
        })
            .then( question => {
                res.status(201).json(question)
            })
            .catch( next )
    }

    static get ( req,res,next ) {
        if( req.query.tag ) {
            Question.find({ tags: req.query.tag})
                .populate('author')
                .then( questions => res.status(200).json(questions))
                .catch( next )
        } else {
            Question.find({})
                .populate('author')
                .then( questions => res.status(200).json(questions))
                .catch( next )
        }
    }

    static getUserQuestion ( req,res,next ) {
        Question.find({author: req.decoded.id})
            .populate('author')
            .then( questions => res.status(200).json(questions))
            .catch( next )
    }

    static getOne ( req,res,next ) {
        Question.findOne({_id: req.params.id})
            .populate('answers')
            .then( question => res.status(200).json(question))
            .catch( next )
    }

    static update ( req,res,next ) {
        let tags = req.body.tags.split(' ')
        Question.updateOne({_id: req.params.id},{
            $set: {
                name: req.body.name,
                description: req.body.description,
                tags
            }
        },{
            runValidators: true
        })
            .then( result => res.status(201).json(result))
            .catch( next )
    }

    static delete ( req,res,next ) {
        Question.deleteOne({_id: req.params.id})
            .then( result => res.status(200).json(result))
            .catch( next )
    }

    static vote ( req,res,next ) {
        Question.findOne({_id:req.params.id})
        .then(question=>{
            let found = false
            let votes = question.votes
            for(let vote of votes){
                if(vote.userId===req.decoded.id){
                    found = true
                    if(vote.vote===req.body.vote){
                        return Question.updateOne({_id:req.params.id},{
                            $pull:{votes:{userId:req.decoded.id}},
                        })
                    }else{
                        return Question.updateOne({'votes.userId':req.decoded.id},{
                            'votes.$.vote':req.body.vote,
                        })
                    }   
                }
            }
            if(found===false){
                return Question.updateOne({_id:req.params.id},{
                    $push:{votes:{userId:req.decoded.id,vote:req.body.vote}},
                })
            }
        })
        .then(question=>{
            res.status(200).json(question)
        })
        .catch(next)
    }
}

module.exports = questionController