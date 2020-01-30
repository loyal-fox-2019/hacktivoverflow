const question = require('../models/questions')
const answer = require('../models/answers')

class QuestionController {
    static askQuestion(req, res, next) {
        question.create({
            title: req.body.title,
            description: req.body.description,
            upVotes: [],
            downVotes: [],
            userId: req.loggedUser.id
        })
            .then(createdQuestion => {
                res.status(201).json(createdQuestion)
            })
            .catch(err => {
                next()
            })
    }

    static getAllQuestions(req, res, next) {
        question.find().populate('userId', 'userName')
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(err => {
                next()
            })
    }

    static upVote(req, res, next) {
        let questionFound
        question.findOne({ _id: req.params.questionId })
            .then(questionData => {
                questionFound = questionData
                if (questionFound.downVotes.includes(req.loggedUser.id)) {
                    return question.update({
                        _id: req.params.questionId
                    }, {
                        $pull: { downVotes: req.loggedUser.id }
                    })
                } else {
                    return
                }
            })
            .then(success => {
                if (questionFound.upVotes.includes(req.loggedUser.id)) {
                    return question.update({
                        _id: req.params.questionId
                    }, {
                        $pull: { upVotes: req.loggedUser.id }
                    })
                } else {
                    return question.update({
                        _id: req.params.questionId
                    }, {
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

    static downVote(req, res, next) {
        let questionFound
        question.findOne({ _id: req.params.questionId })
            .then(questionData => {
                questionFound = questionData
                if (questionFound.upVotes.includes(req.loggedUser.id)) {
                    return question.update({
                        _id: req.params.questionId
                    }, {
                        $pull: { upVotes: req.loggedUser.id }
                    })
                } else {
                    return
                }
            })
            .then(success => {
                if (questionFound.downVotes.includes(req.loggedUser.id)) {
                    return question.update({
                        _id: req.params.questionId
                    }, {
                        $pull: { downVotes: req.loggedUser.id }
                    })
                } else {
                    return question.update({
                        _id: req.params.questionId
                    }, {
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

    static findOneQuestion(req, res, next) {
        // console.log()
        question.findOne({ _id: req.params.questionId }).populate('userId', 'userName')
            .then(questionFound => {
                res.status(200).json(questionFound)
            })
            .catch(err => {
                next()
            })
    }

    static findMyQuestions(req, res, next) {
        question.find({userId: req.loggedUser.id})
        .then(myQuestions => {
            res.status(200).json(myQuestions)
        })
        .catch(err => {
            next()
        })
    }

    static deleteQuestion(req, res, next) {
        question.findOne({_id: req.params.questionId})
        .then(questionFound => {
            if(questionFound.userId != req.loggedUser.id){
                next()
            }else{
                return question.deleteOne({_id: req.params.questionId})
            }
        })
        .then(Qdeleted => {
            return answer.deleteMany({questionId: req.params.questionId})
        })
        .then(Adeleted => {
            res.status(200).json(Adeleted)
        })
        .catch(err => {
            next()
        })
    }

    static editQuestion(req, res, next) {
        question.findOne({_id: req.params.questionId})
        .then(questionDetail => {
            if(questionDetail.userId != req.loggedUser.id){
                next({status: 401, message:`You're not authorized to edit this question`})
            }
            return question.updateOne({_id: req.params.questionId}, {
                title: req.body.title,
                description: req.body.description
            })
        })
        .then(success => {
            return question.findOne({_id: req.params.questionId})
        })
        .then(updatedQuestion => {
            res.status(200).json(updatedQuestion)
        })
        .catch(err => {
            next()
        })
    }
}

module.exports = QuestionController