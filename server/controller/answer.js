const answer = require('../models/answer');
const question = require('../models/question');

class controllerAnswer {
    static create(req, res, next) {
        question.findById(
            req.body.question
        ).then(response => {
            if (!response) throw({code: 400, errmsg: "Question not found"});
            return answer.create({
                question: req.body.question,
                description: req.body.description,
                user: req._id
            })
        }).then(response => {
            return question.findByIdAndUpdate(
                req.body.question,
                {
                    "$push": {
                        answer: response._id
                    }
                })
        }).then(response => {
            res.status(201).json({
                message: "Answer successfully created",
                data: response
            })
        }).catch(next)
    }

    static view(req, res, next) {
        answer.find({
            user: req._id
        }).populate(
            'user', 'name'
        ).then(response => {
            res.status(201).json({
                data: response
            })
        }).catch(next)
    }

    static delete(req, res, next) {
        answer.findByIdAndDelete(
            req.params.id
        ).then(response => {
            if (!response) throw({code: 400, errmsg: "Answer not found"});
            res.status(201).json({
                message: "Answer successfully deleted",
                data: response
            })
        }).catch(next)
    }

    static like(req, res, next) {
        answer.findById(
            req.params.id
        ).then(response => {
            let like = response.upVotes;
            let isUserAlreadyLike = like.indexOf(req._id);
            if (isUserAlreadyLike > -1) {
                throw({code: 400, errmsg: "You already like this answer"});
            }

            let unLike = response.downVotes;
            let isUserAlreadyUnLike = unLike.indexOf(req._id);
            if (isUserAlreadyUnLike > -1) {
                return answer.findByIdAndUpdate(
                    req.params.id,
                    {
                        "$push": {
                            upVotes: req._id
                        },
                        "$pull": {
                            downVotes: req._id
                        }
                    })
            } else {
                return answer.findByIdAndUpdate(
                    req.params.id,
                    {
                        "$push": {
                            upVotes: req._id
                        }
                    })
            }

        }).then(response => {
            res.status(201).send({
                message: "Successfully like"
            })
        }).catch(next)
    }

    static unLike(req, res, next) {
        answer.findById(
            req.params.id
        ).then(response => {
            let unLike = response.downVotes;
            let isUserAlreadyUnLike = unLike.indexOf(req._id);

            if (isUserAlreadyUnLike > -1) {
                throw({code: 400, errmsg: "You already unlike this question"});
            }

            let like = response.upVotes;
            let isUserAlreadyLike = like.indexOf(req._id);
            if (isUserAlreadyLike > -1) {
                return answer.findByIdAndUpdate(
                    req.params.id,
                    {
                        "$push": {
                            downVotes: req._id
                        },
                        "$pull": {
                            upVotes: req._id
                        }
                    })
            } else {
                return answer.findByIdAndUpdate(
                    req.params.id,
                    {
                        "$push": {
                            downVotes: req._id
                        }
                    })
            }
        }).then(response => {
            res.status(201).send({
                message: "Successfully unLike"
            })
        }).catch(next)
    }

}

module.exports = controllerAnswer;