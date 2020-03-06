const ObjectId = require('mongoose').Types.ObjectId;
const questionModel = require('../models/Question');
const commentModel = require('../models/Comment');

class Question {
    static addQuestion(req, res, next) {
        let tags = []
        if (req.body.tags) {
            tags = req.body.tags.split(',');
        }

        questionModel
            .create({
                title: req.body.title,
                body: req.body.body,
                tags,
                owner: req.userLogin._id
            })
            .then((question) => {
                res.status(201).json(question)
            }).catch(next);
    }

    static getQuestion(req, res, next) {
        questionModel
            .find()
            .sort({createdAt: -1})
            .then((questions) => {
                res.status(200).json(questions)
            }).catch(next);
    }

    static getQuestionById(req, res, next) {
        questionModel
            .findOneAndUpdate({
                _id: ObjectId(req.params.id)
            }, {
                $inc: {
                    'view': 1
                }
            }, {
                new: true
            }).populate(['owner'])
            .then((question) => {
                res.status(200).json(question)
            }).catch(next);
    }

    static getCommentsByQuestionId(req, res, next) {
        questionModel
            .findOne({
                _id: ObjectId(req.params.id)
            }).populate([{
                path: 'comments',
                model: 'Comment',
                populate: {
                    path: 'user',
                    model: 'User',
                }
            }])
            .then((question) => {
                res.status(200).json(question)
            }).catch(next);
    }

    static addCommentToQuestionId(req, res, next) {
        let newComment
        commentModel
            .create({
                body: req.body.body,
                user: req.userLogin._id
            })
            .then((comment) => {
                newComment = comment
                return questionModel
                    .updateOne({
                        _id: req.params.id
                    }, {
                        $addToSet: {
                            comments: comment._id
                        },
                        hasNewComment: true
                    })
            }).then((result) => {
                res.status(200).json(newComment)
            }).catch(next);
    }

    static updateCommentToQuestionId(req, res, next) {
        let questionId
        questionModel
            .findOne({
                comments: {$in: [ObjectId(req.params.id)]}
            })
            .then((question) => {
                questionId = question._id;
                return commentModel.findOneAndUpdate({
                    _id: ObjectId(req.params.id),
                },{
                    body: req.body.body
                },{
                    new: true
                })
            }).then((comment) => {
                res.status(200).json({comment, questionId})
            }).catch(next);
    }

    static deleteQuestionById(req, res, next) {
        questionModel
            .findOneAndDelete({
                _id: ObjectId(req.params.id)
            })
            .then((question) => {
                let promises = []
                question.comments.forEach(comment => {
                    promises.push(commentModel.deleteOne({
                        _id: ObjectId(comment._id)
                    }))
                });

                return Promise.all(promises)
            }).then((result) => {
                res.status(200).json(result)
            }).catch(next);
    }

    static updateQuestionById(req, res, next) {
        questionModel
            .findOneAndUpdate({
                _id: ObjectId(req.params.id)
            },{
                title: req.body.title,
                body: req.body.body
            },{
                new: true
            }).then((question) => {
                res.status(200).json(question)
            }).catch(next);
    }
}

module.exports = Question;