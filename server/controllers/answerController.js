const Question = require("../models/question.js");
const Answer = require("../models/answer.js");
const _ = require("underscore");

class AnswerController
{
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
                    if(answer.user.toString()==answer.upvotes[i].toString())
                    {
                        hasUpvoted = true;
                        upIdx = i;
                        break;
                    }
                }
                for(let i=0;i<answer.downvotes.length;i++)
                {
                    if(answer.user.toString()==answer.downvotes[i].toString())
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
                        answer.upvotes.push(req.userInfo.id);
                    }
                    else if(hasDownvoted)
                    {
                        answer.downvotes.splice(downIdx,1);
                        answer.upvotes.push(req.userInfo.id);
                    }

                    res.status(201).json({
                        msg: "Upvote success."
                    })
                }
                else if(req.body.vote == -1)
                {
                    if(!hasUpvoted && !hasDownvoted)
                    {
                        answer.downvotes.push(req.userInfo.id);
                    }
                    else if(hasUpvoted)
                    {
                        answer.upvotes.splice(upIdx,1);
                        answer.downvotes.push(req.userInfo.id);
                    }

                    res.status(201).json({
                        msg: "Downvote success."
                    })
                }
                else
                {
                    res.status(400).json({
                        msg: "Invalid vote."
                    })
                }
                
            }
        })
    }
}

module.exports = AnswerController;