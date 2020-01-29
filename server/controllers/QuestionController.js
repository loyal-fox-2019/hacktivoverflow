const Question = require('../models/Question')
const Answer = require('../models/Answer')

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
            .populate({
                path: "answers",
                populate: { path: 'author' }
            })
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
            .populate('tags')
            .populate({
                path: "answers",
                populate: { path: 'author' }
            })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(next)
    }

    static getBySlug(req, res, next){
        Question
            .findOne({
                slug: req.params.slug
            })
            .populate({ path: 'author', select: '-password' })
            .populate({ path: 'upvote', select: '-password' })
            .populate({ path: 'downvote', select: '-password' })
            .populate('tags')
            .populate({
                path: "answers",
                populate: { path: 'author' }
            })
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
                next()
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
                slug: req.params.slug
            })
            .then(question => {
                const views = question.views || 0
                return Question
                .updateOne({slug: req.params.slug }, {
                    views: eval(views + 1)
                })
            })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(next)
            
    }

    static delete(req, res, next) {
        let question;
        Question
            .findOne({
                slug: req.params.slug
            })
            .then(nQuestion => {
                question = nQuestion
                return Question
                            .deleteOne({
                                slug: req.params.slug
                            })
            })
            .then(() => {
                if (question.answers.length) {
                    const answers = question.answers
                    const nPromise = []
                    answers.forEach(answer => {
                       nPromise.push(Answer.deleteOne({
                        _id: answer
                       })) 
                    });
                    return Promise.all(nPromise)
                }else{
                    return true
                }
            })
            .then(() => {
                res.status(200).json({
                    message: 'deleted a question'
                })
            })
            .catch(next)
    }

    static generateSlug(title){
        title = title.replace(/[^\w\s]/gi, '')
        return title.split(' ').join('-')
    }
}
module.exports = QuestionController