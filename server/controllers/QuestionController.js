'use strict';

const Question = require('../models/question');

class QuestionController {
    static create(req, res, next) {
        const { title, description } = req.body;
        const UserId = req.userLoggedIn.user._id;
        Question.create({
            title,
            description,
            UserId,
            upvotes: [],
            downvotes: []
        })
        .then(question => {
            res.status(200).json(question);
        })
        .catch(next)
    }

    static read(req, res, next) {
        Question.find({ })
        .then(questions => {
            res.status(200).json(questions)
        })
        .catch(next)
    }

    static readOne(req, res, next) {
        const id = req.params.id;
        Question.findById(id)
        .then(question => {
            res.status(200).json(question)
        })
        .catch(next)
    }

    static update(req, res, next) {
        const id = req.params.id;
        const UserId = req.userLoggedIn.user._id;
        const { title, description } = req.body;
        Question.findByIdAndUpdate(id, { title, description })
        .then(question => {
            res.status(200).json(question);
        })
        .catch(next)
    }

    static delete(req, res, next) {
        const id = req.params.id;
        Question.findByIdAndDelete()
        .then()
        .catch(next)
    }

    static updateUpVote(req, res, next) {
        Question.findByIdAndUpdate()
        .then()
        .catch(next)
    }

    static updateDownVote(req, res, next) {
        Question.findByIdAndUpdate()
        .then()
        .catch(next)
    }
}

module.exports = QuestionController;