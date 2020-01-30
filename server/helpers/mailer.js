const nodemailer = require("nodemailer");
const kue = require("kue")
const queue = kue.createQueue()
const modelUser = require("../models/modelUser.js")
const modelQuestions = require("../models/modelQuestions.js")
const modelAnswer = require("../models/modelAnswer.js")
// async..await is not allowed in global scope, must use a wrapper

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "tesmailhof@gmail.com",
        pass: "tessecret123"
    }
})

function sendEmail(payload) {
    // if(payload.votes){

    var mailOption = {
        from: "tesmailhof@gmail.com",
        // to: "amalya.adyanissa@gmail.com",
        to: payload.userId.email,
        subject: "Your Question Status",
        text: `Hi, ${payload.userId.username}! This is how your question titled ${payload.title} is doing!
            It's getting : ${payload.upvote.length} Votes!
            Yaaaay!
            `
        // }
    }
    transporter.sendMail(mailOption, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log(`Email sent: ${info.response}`)
        }
    })
}

function content() {
    // console.log('content')
    modelQuestions.find().populate('userId', '-password')
        .then(data => {
            // console.log(data)
            data.forEach(element => {
                const job = queue
                    .create("sendEmail", element)
                    .save(function (err) {
                        if (!err) console.log('berhasil', job.id)
                    })
            })
            queue.process('sendEmail', function (job, done) {
                sendEmail(job.data)
                // console.log(job.data)
                done()
            })
        })
}

// content()

module.exports = content