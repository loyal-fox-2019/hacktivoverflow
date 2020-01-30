const answer = require('../models/answers')

class AnswerController {
    static getAllAnswers(req, res, next){
        answer.find().populate('userId', 'userName')
        .then(answers => {
            res.status(200).json(answers)
        })
        .catch(err => {
            next()
        })
    }

    static addAnswer(req, res, next){
        answer.create({
            title: req.body.title,
            description: req.body.description,
            upVotes: [],
            downVotes: [],
            userId: req.loggedUser.id,
            questionId: req.params.questionId 
        })
          .then(createdAnswer => {
              res.status(201).json(createdAnswer)
            //   console.log(createdAnswer)
          })
          .catch(err => {
              next()
          })
    }

    static upVote(req, res, next){
        // console.log(req.params.answerId)
        let answerFound
        answer.findOne({_id: req.params.answerId})
        .then(answerData => {
            answerFound = answerData
            if(answerFound.downVotes.includes(req.loggedUser.id)){
                return answer.update({
                    _id: req.params.answerId
                },{
                    $pull: { downVotes: req.loggedUser.id }
                })
            }else{
                return
            }
        })
        .then(success => {
            if(answerFound.upVotes.includes(req.loggedUser.id)){
                return answer.update({
                    _id: req.params.answerId
                },{
                    $pull: { upVotes: req.loggedUser.id }
                })
            }else{
                return answer.update({
                    _id: req.params.answerId
                },{
                    $push: { upVotes: req.loggedUser.id }
                })
            }
        })
        .then(finalResult => {
            res.status(200).json(finalResult)
        })
        .catch(err => {
            next()
        })
    }

    static downVote(req, res, next){
        let answerFound
        answer.findOne({_id: req.params.answerId})
        .then(answerData => {
            answerFound = answerData
            if(answerFound.upVotes.includes(req.loggedUser.id)){
                return answer.update({
                    _id: req.params.answerId
                },{
                    $pull: { upVotes: req.loggedUser.id }
                })
            }else{
                return
            }
        })
        .then(success => {
            if(answerFound.downVotes.includes(req.loggedUser.id)){
                return answer.update({
                    _id: req.params.answerId
                },{
                    $pull: { downVotes: req.loggedUser.id }
                })
            }else{
                return answer.update({
                    _id: req.params.answerId
                },{
                    $push: { downVotes: req.loggedUser.id }
                })
            }
        })
        .then(finalResult => {
            res.status(200).json(finalResult)
        })
        .catch(err => {
            next()
        })
    }
    static myAnswers(req, res, next) {
        answer.find({userId: req.loggedUser.id}).populate('questionId')
        .then(myAnswers => {
            res.status(200).json(myAnswers)
        })
        .catch(err => {
            next()
        })
    }

    static updateAnswer(req, res, next){
        answer.findOne({_id: req.params.answerId})
        .then(answerData => {
            if(answerData.userId != req.loggedUser.id){
                next({status: 401, message:`You're not authorized to edit this answer`})
            }
            return answer.updateOne({_id: req.params.answerId}, {
                title: req.body.title,
                description: req.body.description
            })
        })
        .then(answerUpdated => {
            res.status(200).json(answerUpdated)
        })
        .catch(err => {
            next()
        })
    }
}

module.exports = AnswerController