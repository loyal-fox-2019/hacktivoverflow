const Question = require("../models/question.js");
const Answer = require("../models/answer.js");
const _ = require("underscore");

class AnswerController
{
    static getOneAnswer(req, res, next)
    {
        Answer.findById(req.params.id)
        .populate({
            path: 'question',
            populate: {
                path: 'user',
                select: 'username'
            }
        })
        .exec()
        .then((answer) => {
            res.status(200).json(answer)
        })
        .catch((err) => {
            console.log(err);
            
        })
    }

    static addNewAnswer(req, res, next)
    {
        const data = _.pick(req.body,'title','description','question');
        data.user = req.userInfo.id;
        data.upvotes = [];
        data.downvotes = [];
        let newAnswer;

        Answer.create(data)
        .then((answer) => {
            newAnswer = answer;
            return Question.findById(answer.question).exec();
        })
        .then((question) => {
            question.answers.push(newAnswer._id);
            return question.save();
        })
        .then(() => {
            res.status(201).json(newAnswer);
        })
        .catch((err) => {
            console.log(err);            
        });
    }

    static updateAnswer(req, res, next)
    {
        Answer.findById(req.params.id)
        .exec()
        .then((answer) => {
            answer.title = req.body.title;
            answer.description = req.body.description;
            return answer.save();
        })
        .then((answer) => {
            res.status(201).json(answer);
        })
        .catch((err) => {
            console.log(err);            
        });
    }

    static getMyVote(req, res, next)
    {
        Answer.findById(req.params.id)
        .exec()
        .then((answer) => {
            if(answer.user.toString() == req.userInfo.id)
            {
                res.status(200).json({
                    vote: 0
                })
            }
            else
            {
                let hasUpvoted = false;
                let hasDownvoted = false;

                for(let i=0;i<answer.upvotes.length;i++)
                {
                    if(answer.upvotes[i].toString()==req.userInfo.id.toString())
                    {
                        hasUpvoted = true;
                        break;
                    }
                }
                for(let i=0;i<answer.downvotes.length;i++)
                {
                    if(answer.downvotes[i].toString()==req.userInfo.id.toString())
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

    static voteAnswer(req, res, next)
    {
        Answer.findById(req.params.id)
        .exec()
        .then((answer) => {
            if(answer.user.toString() == req.userInfo.id)
            {
                res.status(400).json({
                    msg: "You cannot vote for your answer."
                })
            }
            else
            {
                let hasUpvoted = false;
                let upIdx;
                let hasDownvoted = false;
                let downIdx;

                for(let i=0;i<answer.upvotes.length;i++)
                {
                    if(answer.upvotes[i].toString()==req.userInfo.id.toString())
                    {
                        hasUpvoted = true;
                        upIdx = i;
                        break;
                    }
                }
                for(let i=0;i<answer.downvotes.length;i++)
                {
                    if(answer.downvotes[i].toString()==req.userInfo.id.toString())
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
                        answer.upvotes.push(req.userInfo.id);
                    }
                    else if(hasDownvoted)
                    {
                        // switch downvote to upvote
                        answer.downvotes.splice(downIdx,1);
                        answer.upvotes.push(req.userInfo.id);
                    }
                    else
                    {
                        // undo upvote
                        answer.upvotes.splice(upIdx,1);
                    }

                    return answer.save()
                }
                else if(req.body.vote == -1)
                {
                    if(!hasUpvoted && !hasDownvoted)
                    {
                        //new downvote
                        answer.downvotes.push(req.userInfo.id);
                    }
                    else if(hasUpvoted)
                    {
                        // switch upvote to downvote
                        answer.upvotes.splice(upIdx,1);
                        answer.downvotes.push(req.userInfo.id);
                    }
                    else
                    {
                        // undo downvote
                        answer.downvotes.splice(downIdx,1);
                    }

                    return answer.save()
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
}

module.exports = AnswerController;