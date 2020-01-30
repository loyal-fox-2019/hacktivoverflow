'use strict';

const Question = require('../models/question');
const Answer = require('../models/answer');
const Jwt = require('../helper/jwt');

class QuestionController {
    static create(req, res, next) {
        const newQuestion = {
            title: req.body.title,
            description: req.body.description,
            userId: req.userId
        }
        Question.create(newQuestion)
        .then(question => {
            res.status(201).json({
                message: 'New question have been posted',
                body: question
            })
        })
        .catch(error => {
            next(error);
        })
    }

    static read(req, res, next) {
        Question.find().populate('userId')
        .then(questions => {
            res.status(200).json({
                message: 'OK',
                body: questions
            })
        })
        .catch(error => {
            next(error);
        })
    }

    static readOne(req, res, next) {
        Question.findOne({_id: req.params.id})
        .then(question => {
            res.status(200).json({
                message: 'OK',
                body: question
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
        Question.findByIdAndUpdate(req.params.id, updateQuestion)
        .then(response => {
            res.status(200).json({
                message: 'Question have been updated',
                body: response
            })
        })
        .catch(error => {
            next(error);
        })
    }

    static delete(req, res, next) {
        let question;
        Question.findByIdAndDelete(req.params.id)
        .then(response => {
            question = response
            return Answer.deleteMany({questionId: req.params.id})
        })
        .then(response => {
            res.status(200).json({
                message: 'Question have been deleted',
                body: question
            })
        })
        .catch(error => {
            next(error);
        })
    }

    static downVote(req, res, next) {
        let newQuestion;
        Question.findOne({_id: req.params.id})
        .then(question => {
            const checkUpVotes = question.upvotes.find(upvote => {return upvote == req.userId});
            const checkDownVotes = question.downvotes.find(downvote => {return downvote == req.userId});
            let newUpvotes;
            let newDownVotes;
            if(checkUpVotes) {
                newUpvotes = question.upvotes.filter(upvote => {return upvote != req.userId});
                question.upvotes = newUpvotes;
            } else if(checkDownVotes) {
                newDownVotes = question.downvotes.filter(downvote => {return downvote != req.userId});
                question.downvotes = newDownVotes;
            }
            if(!checkDownVotes) {
                question.downvotes.push(req.userId);
            }
            newQuestion = question;
            return Question.findByIdAndUpdate(req.params.id, newQuestion)
        })
        .then(response => {
            response = newQuestion
            res.status(200).json({
                message: 'Question have been downvoted',
                body: response
            })
        })
        .catch(error => {
            next(error);
        })
    }
    
    static upVote(req, res, next) {
        let newQuestion;
        Question.findOne({_id: req.params.id})
        .then(question => {
            const checkDownVotes = question.downvotes.find(downvote => {return downvote == req.userId});
            const checkUpVotes = question.upvotes.find(upvote => {return upvote == req.userId});
            let newDownVotes;
            let newUpVotes;
            if(checkDownVotes) {
                newDownVotes = question.downvotes.filter(downvote => {return downvote != req.userId});
                question.downvotes = newDownVotes;
            } else if(checkUpVotes) {
                newUpVotes = question.upvotes.filter(upvote => {return upvote != req.userId});
                question.upvotes = newUpVotes;
            }
            if(!checkUpVotes) {
                question.upvotes.push(req.userId)
            }
            newQuestion = question;
            return Question.findByIdAndUpdate(req.params.id, question)
        })
        .then(response => {
            response = newQuestion;
            res.status(200).json({
                message: 'Question have been upvoted',
                body: response
            })
        })
        .catch(error => {
            next(error);
        })
    }
}

module.exports = QuestionController;