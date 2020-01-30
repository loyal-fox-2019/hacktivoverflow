"use strict"

const Question = require('../models/question')

class QuestionController {
    static create(req, res, next) {
        console.log('ok')
        const obj = {
            title: req.body.title,
            description: req.body.description,
            userId: req.userId
        }
        Question.create(obj)
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static findAll(req, res, next) {
        Question.find()
            .then(datas => {
                res.status(200).json(datas)
            })
            .catch(next)
    }

    static upVotes(req, res, next) {
        Question.findById(req.params.id)
            .then(data => {
                let downVotes = data.downvotes
                let upVotes = data.upvotes


                let checkMeUp = []
                let checkMeDown = []
                data.upvotes.forEach(element => {
                    let stringUpVotes = JSON.stringify(element)
                    let newString = `"${req.userId}"`
                    if (stringUpVotes === newString) {
                        checkMeUp.push(1)
                    }
                });

                data.downvotes.forEach(el => {
                    let stringDownVotes = JSON.stringify(el)
                    let newString = `"${req.userId}"`
                    if (stringDownVotes === newString) {
                        checkMeDown.push(1)
                    }
                })


                if (checkMeUp.length > 0 || checkMeDown > 0) {
                    downVotes = data.downvotes.filter(element => {
                        let stringDownVotes = JSON.stringify(element)
                        let newString = `"${req.userId}"`

                        return stringDownVotes !== newString
                    })

                    upVotes = data.upvotes.filter(element => {
                        let stringUpVotes = JSON.stringify(element)
                        let newString = `"${req.userId}"`
                        return stringUpVotes !== newString
                    })
                } else if (checkMeUp.length === 0) {
                    upVotes.push(req.userId)
                } else {
                    upVotes.push(req.userId)
                }
                return Question.findByIdAndUpdate(data._id, {
                    upvotes: upVotes,
                    downvotes: downVotes
                })

            })
            .then(data => {
                res.status(200).json(data)
                // console.log(data)
            })
            .catch(next)
    }

    static downVotes(req, res, next) {
        Question.findById(req.params.id)
            .then(data => {
                let downVotes = data.downvotes
                let upVotes = data.upvotes


                let checkMeUp = []
                let checkMeDown = []
                if (data.upvotes.length > 0) {
                    data.upvotes.forEach(element => {

                        let stringUpVotes = JSON.stringify(element)
                        let newString = `"${req.userId}"`
                        if (stringUpVotes === newString) {
                            checkMeUp.push(1)
                        }
                    });
                }
                if (data.downvotes.length > 0) {
                    data.downvotes.forEach(el => {

                        let stringDownVotes = JSON.stringify(el)
                        let newString = `"${req.userId}"`
                        if (stringDownVotes === newString) {
                            checkMeDown.push(1)
                        }
                    })

                }

                if (checkMeDown > 0) {

                    downVotes = data.downvotes.filter(element => {
                        let stringDownVotes = JSON.stringify(element)
                        let newString = `"${req.userId}"`

                        return stringDownVotes !== newString
                    })
                }
                if (checkMeUp.length > 0) {

                    upVotes = data.upvotes.filter(element => {
                        let stringUpVotes = JSON.stringify(element)
                        let newString = `"${req.userId}"`
                        return stringUpVotes !== newString
                    })
                } else if (checkMeDown.length === 0) {

                    downVotes.push(req.userId)
                } else {

                    downVotes.push(req.userId)
                }
                return Question.findByIdAndUpdate(data._id, {
                    upvotes: upVotes,
                    downvotes: downVotes
                })

            })
            .then(data => {
                res.status(200).json(data)
                // console.log(data)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        Question.findByIdAndDelete(req.params.id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static findById(req, res, next) {
        Question.findById(req.params.id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static update(req, res, next) {
        Question.findByIdAndUpdate(req.params.id,
            {
                title: req.body.title,
                description: req.body.description
            })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(next)
    }

}

module.exports = QuestionController