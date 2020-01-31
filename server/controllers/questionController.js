const Question = require("../models/question.js");
const Answer = require("../models/answer.js");
const _ = require("underscore");

class QuestionController
{
    static getAllQuestions(req, res, next)
    {
        let selected = [];
        Question.find()
        .populate('user','username')
        .exec()        
        .then((questions) => {
            if(req.query.search)
            {
                selected = questions.filter((v) => {
                    return RegExp(`\\b${req.query.search}`,'i').test(v.title) || 
                        RegExp(`\\b${req.query.search}`,'i').test(v.description)
                });
                res.status(200).json(selected)
            }
            else
            {
                res.status(200).json(questions)
            }
            
        })
        .catch((err) => {
            console.log(err);            
        });
    }

    static getOneQuestion(req, res, next)
    {
        Question.findById(req.params.id)
        .populate({
            path: 'answers',
            populate: {
                path: 'user',
                select: 'username'
            }
        })
        .populate('user','username')
        .exec()
        .then((question) => {
            if(question)
            {
                res.status(200).json(question);
            }
            else
            {
                res.status(404).json({
                    msg: "Question not found."
                });
            }
        })
        .catch((err) => {
            console.log(err);            
        });
    }

    static addNewQuestion(req, res, next)
    {
        const data = _.pick(req.body,'title','description','tags');
        data.user = req.userInfo.id;
        data.upvotes = [];
        data.downvotes = [];
        data.answers = [];
        // if(req.body.tags)
        // {
        //     data.tags = req.body.tags.split(' ').filter((v) => {return !!v});
        // }
        // else
        // {
        //     data.tags = [];
        // }
        console.log(req.body);
        

        Question.create(data)
        .then((question) => {
            res.status(201).json(question);
        })
        .catch((err) => {
            console.log(err);            
        });
    }

    static updateQuestion(req, res, next)
    {
        const data = _.pick(req.body,'title','description','tags');
        // if(req.body.tags)
        // {
        //     data.tags = req.body.tags.split(' ').filter((v) => {return !!v});
        // }

        Question.findById(req.params.id)
        .exec()
        .then((question) => {
            if(question)
            {
                for(let key in question)
                {
                    if(data.hasOwnProperty(key))
                    {
                        question[key] = data[key];
                    }
                }

                return question.save();
            }
            else
            {
                res.status(404).json({
                    msg: "Question not found."
                });
            }
        })
        .then(() => {
            res.status(201).json({
                msg: "Update success."
            });
        })
        .catch((err) => {
            console.log(err);            
        });
    }

    static deleteQuestion(req, res, next)
    {
        Question.findByIdAndDelete(req.params.id)
        .exec()
        .then((deletedQn) => {
            return Answer.deleteMany({
                _id: {
                    $in: deletedQn.answers
                }
            })
        })
        .then(() => {
            res.status(201).json({
                msg: "Question deleted."
            })
        })
        .catch((err) => {
            res.status(404).json({
                msg: "Question not found."
            })
        })
    }

    static voteQuestion(req, res, next)
    {
        Question.findById(req.params.id)
        .exec()
        .then((question) => {
            if(question.user.toString() == req.userInfo.id)
            {
                res.status(400).json({
                    msg: "You cannot vote for your question."
                })
            }
            else
            {
                let hasUpvoted = false;
                let upIdx;
                let hasDownvoted = false;
                let downIdx;

                for(let i=0;i<question.upvotes.length;i++)
                {
                    if(question.upvotes[i].toString() == req.userInfo.id.toString())
                    {
                        hasUpvoted = true;
                        upIdx = i;
                        break;
                    }
                }
                for(let i=0;i<question.downvotes.length;i++)
                {
                    if(question.downvotes[i].toString() == req.userInfo.id.toString())
                    {
                        hasDownvoted = true;
                        downIdx = i;
                        break;
                    }
                }

                if(req.body.vote == 1)
                {
                    if(!hasUpvoted && !hasDownvoted)
                    {
                        //new upvote
                        question.upvotes.push(req.userInfo.id);
                    }
                    else if(hasDownvoted)
                    {
                        // switch downvote to upvote
                        question.downvotes.splice(downIdx,1);
                        question.upvotes.push(req.userInfo.id);
                    }
                    else
                    {
                        // undo upvote
                        question.upvotes.splice(upIdx,1);
                    }

                    return question.save();
                }
                else if(req.body.vote == -1)
                {
                    if(!hasUpvoted && !hasDownvoted)
                    {
                        //new downvote
                        question.downvotes.push(req.userInfo.id);
                    }
                    else if(hasUpvoted)
                    {
                        // switch upvote to downvote
                        question.upvotes.splice(upIdx,1);
                        question.downvotes.push(req.userInfo.id);
                    }
                    else
                    {
                        // undo downvote
                        question.downvotes.splice(downIdx,1);
                    }

                    return question.save();
                    
                }
                else
                {
                    res.status(400).json({
                        msg: "Invalid vote."
                    })
                }
                
            }
        })
        .then(() => {
            res.status(201).json({
                msg: "Vote success."
            })
        })
        .catch((err) => {
            console.log(err);
            
        })
    }

    static getMyVote(req, res, next)
    {
        Question.findById(req.params.id)
        .exec()
        .then((question) => {
            if(question.user.toString() == req.userInfo.id)
            {
                res.status(200).json({
                    vote: 0
                })
            }
            else
            {
                let hasUpvoted = false;
                let hasDownvoted = false;

                for(let i=0;i<question.upvotes.length;i++)
                {
                    if(question.upvotes[i].toString()==req.userInfo.id.toString())
                    {
                        hasUpvoted = true;
                        break;
                    }
                }
                for(let i=0;i<question.downvotes.length;i++)
                {
                    if(question.downvotes[i].toString()==req.userInfo.id.toString())
                    {
                        hasDownvoted = true;
                        break;
                    }
                }

                if(!hasUpvoted && !hasDownvoted)
                {
                    res.status(200).json({
                        vote: 0
                    })
                }
                else if(hasDownvoted)
                {
                    res.status(200).json({
                        vote: -1
                    })
                }
                else
                {
                    res.status(200).json({
                        vote: 1
                    })
                }
            }
        })
        .catch((err) => {
            console.log(err);
            
        })
    }
}

module.exports = QuestionController;