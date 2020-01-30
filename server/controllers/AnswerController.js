'use strict';

const Answer = require('../models/answer');
const Jwt = require('../helper/jwt');
const User = require('../models/user')

class AnswerController {
    static create(req, res, next) {
        const newAnswer = {
            title: req.body.title,
            description: req.body.description,
            userId: req.userId,
            questionId: req.params.id
        }
        Answer.create(newAnswer)
        .then(answer => {
            return Answer.populate(answer, 'userId');
        })
        .then(answer => {
            res.status(201).json({
                message: 'Answer have been posted',
                body: answer
            })
        })
        .catch(error => {
            next(error);
        })
    }

    static read(req, res, next) {
        Answer.find({questionId: req.params.id}).populate('userId')
        .then(answers => {
            res.status(200).json({
                message: 'OK',
                body: answers
            })
        })
        .catch(error => {
            next(error);
        })
    }

    static update(req, res, next) {
        const updateQuestion = {
            title: req.body.title,
            description: req.body.description
        }
        Answer.findByIdAndUpdate(req.params.id, updateQuestion)
        .then(response => {
            res.status(200).json({
                message:'OK',
                body: response
            });
        })
        .catch(error => {
            next(error);
        })
    }

    static readOne(req, res, next) {
        Answer.findOne({_id: req.params.id})
        .then(answer => {
            res.status(200).json({
                message: 'OK',
                body: answer
            })
        })
        .catch(error => {
            next(error);
        })
    }

    static delete(req, res, next) {
        Answer.findByIdAndDelete(req.params.id)
        .then(response => {
            res.status(200).json({
                message: 'OK',
                body: response
            });
        })
        .catch(error => {
            next(error);
        })
    }

    static downvotes(req, res, next) {
        let newAnswer;
        Answer.findOne({_id: req.params.id})
        .then(answer => {
            const checkDownVotes = answer.downvotes.find(downvote => {return downvote == req.userId});
            const checkUpVotes = answer.upvotes.find(upvote => {return upvote == req.userId});
            let newDownVotes;
            let newUpVotes;
            if(checkDownVotes) {
                newDownVotes = answer.downvotes.filter(downvote => {return downvote != req.userId});
                answer.downvotes = newDownVotes;                               
            } else if(checkUpVotes && !checkDownVotes) {
                newUpVotes = answer.upvotes.filter(upvote => {return upvote != req.userId});
                answer.upvotes = newUpVotes;
            } 
            if(!checkDownVotes) {
                answer.downvotes.push(req.userId);
            }
            newAnswer = answer;
            return Answer.findByIdAndUpdate( req.params.id, answer);
        })
        .then(response => {
            return Answer.populate(newAnswer, 'userId');
        })
        .then(response => {
            res.status(200).json({
                message: 'OK',
                body: response
            });
        })
        .catch(error => {
            next(error);
        })
    }   

    static upvotes(req, res, next) {
        let newAnswer;
        Answer.findOne({_id: req.params.id})
        .then(answer => {
            const checkDownVotes = answer.downvotes.find(downvote => {return downvote == req.userId});
            const checkUpVotes = answer.upvotes.find(upvote => {return upvote == req.userId});
            let newDownVotes;
            let newUpVotes;
            if(checkDownVotes) {
                newDownVotes = answer.downvotes.filter(downvote => {return downvote != req.userId});
                answer.downvotes = newDownVotes;
            } else if(checkUpVotes) {
                newUpVotes = answer.upvotes.filter(upvote => {return upvote != req.userId});
                answer.upvotes = newUpVotes;
            }
            if(!checkUpVotes) {
                answer.upvotes.push(req.userId);
            }
            newAnswer = answer
            return Answer.findByIdAndUpdate(req.params.id, answer)
            .then(response => {
                return Answer.populate(newAnswer, 'userId');
            })
            .then(response => {
                res.status(200).json({
                    message: 'OK',
                    body: newAnswer
                })
            })
            .catch(error => {
                next(error);
            })
        })
    }
}

module.exports = AnswerController;