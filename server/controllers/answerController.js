const Answer = require('../models/answerModel');

class AnswerController{
    static create(req,res,next){
        console.log(req.body)
        Answer.create(req.body)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
            console.log(err)
        })
    }

    static getAllById(req,res,next){
        Answer.find({
            QuestionId : {
                $elemMatch : { $in : req.params._id}
            }
        })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static findAll(req,res,next){
        Answer.find()
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static edit(req,res,next){
        console.log(req.params)
        Answer.findOneAndUpdate({
            _id : req.params._id    
        },req.body)
        .then(response => {
            console.log('berhasil update')
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static delete(req,res,next){
        Answer.deleteOne({
            _id : req.body._id-answer
        })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static upvote(req,res,next){
        Answer.findOne({
            _id : req.params._id
        })
        .then(response => {
            if(!response.upvotes.includes(req.body.user_id)){
                console.log('ya gak ada')
                Answer.update({
                    _id : req.params._id,
                },{
                    $addToSet : {
                        "upvotes" : req.body.user_id
                    }
                })
                .then(response => {
                    res.status(201).json({message : 'upvote success'})
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).json({message : 'upvote fail'})
                })
            }
            else {
                Answer.update({
                    _id : req.params._id
                },{
                    $pull : {
                        upvotes : req.body.user_id
                    }
                })
                .then(response => {
                    console.log('berhasil hapus upvote')
                    console.log(response)
                    res.status(201).json({message : 'upvote retracted'})
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).json({message : 'retraction fail'})
                })
            }
        })
    }
    
    static downvote(req,res,next){
        Answer.findOne({
            _id : req.params._id
        })
        .then(response => {
            if(!response.downvotes.includes(req.body.user_id)){
                console.log('ya gak ada')
                Answer.update({
                    _id : req.params._id,
                },{
                    $addToSet : {
                        "downvotes" : req.body.user_id
                    }
                })
                .then(response => {
                    res.status(201).json({message : 'downvote success'})
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).json({message : 'downvote fail'})
                })
            }
            else {
                Answer.update({
                    _id : req.params._id
                },{
                    $pull : {
                        downvotes : req.body.user_id
                    }
                })
                .then(response => {
                    console.log('berhasil hapus downvote')
                    console.log(response)
                    res.status(201).json({message : 'downvote retracted'})
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).json({message : 'retraction fail'})
                })
            }
        })
    }
}

module.exports = AnswerController