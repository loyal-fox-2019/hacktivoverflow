const nodemailer = require('nodemailer')
const kue = require('kue')
const queue = kue.createQueue()
const QuestionModel = require('../models/questionModel')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jovihacktiv@gmail.com',
        pass: 'H4ckt1v8J0vi'
    }
})

function sendMail(questions){
    console.log(questions)
    var mailOptions = {
        from: 'jovihacktiv@gmail.com',
        to: 'jovipetraratulangi@gmail.com',
        subject: 'Here are the questions!',
        html: `<h4>Hey! Here's what people have been asking</h4>
        <br>
        <h4>${questions[0].title}</h4>
        <p>${questions[0].content}</p>
        <p>${questions[0].author}</p>
        <br>
        <br>
        <h4>${questions[1].title}</h4>
        <p>${questions[1].content}</p>
        <p>${questions[1].author}</p>
        <br>
        <br>
        <br>`
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
    QuestionModel.find().sort({createdAt : -1}).limit(3)
    .then(datas=>{
        const job = queue.create('sendEmail', datas).save(err=>{
            if(!err) console.log('Success : '+ job.id)
        })
        queue.process('sendEmail', (job, done)=>{
            sendMail(job.data)
            done()
        })
    })
}

module.exports = emailContent