const Question = require('../models/Question')
const send = require('./mailer')
const kue = require("kue");
const queue = kue.createQueue();

module.exports = function () {  
    console.log('excetuting que')
    queue.process("question", function (job, done) {  
        const id = job.data.data
        Question
            .findOne({
                _id: id
            })
            .then(question => {
                // console.log(question, '==============')
                if (question) {
                    send(question.content, job.data.email)
                    return Question
                                .updateOne({ _id: id }, {
                                    notification: true
                                })
                        
                }else{
                    return true
                }   
            })
            .then((data) => {
                done()
                return data
            })
            .catch(err => {
                console.log(err)
                done(err)
            })
        // done()
    })
}