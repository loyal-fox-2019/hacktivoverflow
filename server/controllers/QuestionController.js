const Question = require('../models/Question')

class QuestionController {
    static create(req, res, next){
        const { title, content, tags } = req.body
        Question
            .create({
                title, 
                content, 
                tags,
                author: req.userId,
                slug: QuestionController.generateSlug(title)
            })
            .then(question => {
                res.status(201).json(question)
            })
            .catch(next)
    }

    static getAll(req, res, next){
        Question
            .find()
            .populate({ path: 'author', select: '-password' })
            .populate({ path: 'upvote', select: '-password' })
            .populate({ path: 'downvote', select: '-password' })
            .populate('tags')
            // .populate('answers')
            // .populate({ 
            //     path: 'answers',
            //     populate: { path: 'author' }
            // })
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(next)
    }

    static get(req, res, next){
        Question
            .findOne({
                _id: req.params.id
            })
            .populate({ path: 'author', select: '-password' })
            .populate({ path: 'upvote', select: '-password' })
            .populate({ path: 'downvote', select: '-password' })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(next)
    }

    static update(req, res, next){
        const { title, content, tags } = req.body
        Question
            .updateOne({_id: req.params.id},{
                title, 
                content, 
                tags,
                author: req.userId,
                slug: QuestionController.generateSlug(title)
            })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(next)
    }

    static upVote(req, res, next){
        const id = req.params.id
        Question
            .findOne({
                _id: id,
                upvote: {
                    $in: [req.userId]
                }
            })
            .then(cancel => {
                if (cancel) {
                    return Question
                            .updateOne({_id: id}, {
                                $pullAll: {
                                    upvote: [req.userId]
                                }
                            })
                }else{
                    return Question
                            .updateOne({_id: id}, {
                                $push: {
                                    upvote: [req.userId]
                                }
                            })
                }
            })
            .then(question => {
                next()
            })
            .catch(next)
    }

    static downVote(req, res, next){
        const id = req.params.id
        Question
            .findOne({
                _id: id,
                downvote: {
                    $in: [req.userId]
                }
            })
            .then(cancel => {
                if (cancel) {
                    return Question
                            .updateOne({_id: id}, {
                                $pullAll: {
                                    downvote: [req.userId]
                                }
                            })
                }else{
                    return Question
                            .updateOne({_id: id}, {
                                $push: {
                                    downvote: [req.userId]
                                }
                            })
                }
            })
            .then(question => {
                next()
            })
            .catch(next)
    }

    static updateViews(req, res, next){
        Question
            .findOne({
                _id: req.params.id
            })
            .then(question => {
                const views = question.views || 0
                return Question
                .updateOne({ _id: req.params.id }, {
                    views: eval(views + 1)
                })
            })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(next)
            
    }

    static generateSlug(title){
        return title.split(' ').join('-')
    }
}
module.exports = QuestionController