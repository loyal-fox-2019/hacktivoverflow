const nodemailer = require('nodemailer')
const kue = require('kue')
const queue = kue.createQueue()
const QuestionModel = require('../models/question')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_ACC,
        pass: process.env.GMAIL_PASS
    }
})

function sendMail(payload){
    let totalVotes = 0
    for(let obj of payload.votes){
        totalVotes += obj.value
    }
    var mailOptions = {
        from: process.env.GMAIL_ACC,
        to: payload.userId.email,
        subject: 'Weekly report',
        html: `<h4>Question Title: ${payload.title}</h4>
        <p>Total Votes: ${totalVotes}</p>
        <br>Question Detail:<br>${payload.description}`
    }
    transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log(err);
        }
        else {
            console.log(`Email sent: ${info.response}`);   
        }
    })
}

function emailContent(){
    QuestionModel.find().populate('userId', '-password')
    .then(datas=>{
        datas.forEach(element=>{
            const job = queue
            .create('sendEmail', element)
            .save(err=>{
                if(!err) console.log('Success', job.id)
            })
        })
        queue.process('sendEmail', (job, done)=>{
            sendMail(job.data)
            done()
        })
    })
}

module.exports = emailContent