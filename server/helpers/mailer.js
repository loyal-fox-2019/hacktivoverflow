const nodemailer = require('nodemailer')
const kue = require('kue')
const queue = kue.createQueue()
const Question = require('../models/question')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.MAILER
    }
  });

function sendEmail(payload){
    var mailOptions = {
        from: 'apakabar121212@gmail.com',
        to: payload.user.email,
        subject: 'Weekly Popularity Update!',
        text: `
        This is your questions weekly updates of upvotes and downvotes.
        Title: ${payload.title},
        Description: ${payload.description},
        Upvotes: ${payload.upvotes.length},
        Downvotes: ${payload.downvotes.length}`
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


function content(){
    // console.log('content')
    Question.find().populate('user', '-password')
    .then(data=>{
        // console.log(data)
        data.forEach(element=>{
            const job = queue
            .create("sendEmail", element)
            .save(function(err){
                if(!err) console.log('berhasil', job.id)
            })
        })
        queue.process('sendEmail', function(job, done){
            sendEmail(job.data)
            // console.log(job.data)
            done()
        })
    })
}

// content()

module.exports = content
