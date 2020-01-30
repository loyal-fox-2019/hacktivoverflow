const User = require("../models/user");
const Question = require("../models/question");
const Answer = require("../models/answer");
const nodemailer = require("nodemailer");
const kue = require("kue");
const queue = kue.createQueue();

function updateUserReputation(user)
{
    var question_count = 0;
    var answer_count = 0;
    var qn_upvotes = 0;
    var ans_upvotes = 0;
    var reputation = 0;

    Question.find({
        user: user._id
    })
    .then((questions) => {
        question_count = questions.length;        
        
        for(let i=0;i<question_count;i++)
        {
            qn_upvotes += questions[i].upvotes.length;
        }

        return Answer.find({
            user: user._id
        })
    })    
    .then((answers) => {
        answer_count = answers.length;
        for(let i=0;i<answer_count;i++)
        {
            ans_upvotes += answers[i].upvotes.length;
        }

        console.log(user.username,question_count,answer_count,qn_upvotes,ans_upvotes);    
        reputation = 5*question_count + 5*answer_count + 10*qn_upvotes + 15*ans_upvotes;

        return User.findById(user._id)
        .exec()
    })
    .then((u) => {
        u.reputation = reputation;
        return u.save();
    })
    .then(() => {
        console.log("Successfully calculated reputation of user", user._id);
        
    })
}

class Scheduled
{
    static bulkUpdateReputation()
    {
        User.find()
        .then((users) => {
            users.forEach((user) => {
                const job = queue.create("updateUserReputation",user)
                .save((err) => {
                    if(!err)
                    {
                        console.log("job done", job.id);
                        
                    }
                })
            })

            queue.process("updateUserReputation", (job, done) => {
                updateUserReputation(job.data)
                done()
            })
        })
    }

    static emailWeekSummary()
    {

    }
}

module.exports = Scheduled;