const questionModel = require('../models/Question');
const commentModel = require('../models/Comment');
const ObjectId = require('mongoose').Types.ObjectId;

class Vote {
    static processVote(req, res, next) {
        const {
            voteState,
            type
        } = req.body
        let selectedModel
        let questionId
        if (type === 'question') {
            selectedModel = questionModel
        } else {
            selectedModel = commentModel
            questionModel
                .findOne({
                    comments: {$in: [ObjectId(req.body._id)]}
                })
                .then((question) => {
                    questionId = question._id;
                }).catch(next);
        }

        selectedModel
            .findOne({
                _id: ObjectId(req.body._id)
            })
            .then((findResult) => {
                let objUpdate;
                let isUpvoted = findResult.upvotes.includes(req.userLogin._id)
                let isDownvoted = findResult.downvotes.includes(req.userLogin._id)

                if (isUpvoted && voteState === 'up') {
                    // kalo sudah vote up sebelumnya maka cancel upvote
                    objUpdate = {
                        $pull: {
                            upvotes: req.userLogin._id
                        }
                    }
                } else if (isDownvoted && voteState === 'down') {
                    // kalo sudah vote down sebelumnya maka cancel downvote
                    objUpdate = {
                        $pull: {
                            downvotes: req.userLogin._id
                        }
                    }
                } else if (isDownvoted && voteState === 'up') {
                    // klo beda maka ubah berdasarkan votestate nya
                    objUpdate = {
                        $addToSet: {
                            upvotes: req.userLogin._id
                        },
                        $pull: {
                            downvotes: req.userLogin._id
                        }
                    }
                } else if (isUpvoted && voteState === 'down') {
                    // klo beda maka ubah berdasarkan votestate nya
                    objUpdate = {
                        $addToSet: {
                            downvotes: req.userLogin._id
                        },
                        $pull: {
                            upvotes: req.userLogin._id
                        }
                    }
                } else if (voteState === 'up') {
                    // klo benar2 belum vote maka initiate vote
                    objUpdate = {
                        $addToSet: {
                            upvotes: req.userLogin._id
                        }
                    }
                } else if (voteState === 'down') {
                    // klo benar2 belum vote maka initiate vote
                    objUpdate = {
                        $addToSet: {
                            downvotes: req.userLogin._id
                        }
                    }
                }

                return selectedModel
                    .findByIdAndUpdate(req.body._id, objUpdate, {
                        new: true
                    })
            }).then((result) => {
                if (type === 'question') {
                    res.status(200).json({result})
                } else {
                    res.status(200).json({result, questionId})
                }
            }).catch(next);
    }
}

module.exports = Vote;