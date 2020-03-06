const nodemailer = require('nodemailer')
const kue = require('kue')
const queue = kue.createQueue()
const questionModel = require('../models/Question');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

function sendEmail(payload){
    let urls = []
    payload.bodies.forEach(body => {
        urls.push(`
        <a href='${body}'>
            ${body}
        </a>
        `)
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: payload.email,
        subject: 'no-reply: Mail notifier for your try in errorHandler()',
        html: `
            <h1>Here are the list of your tries that have new catch from others</h1>
        
            <p>Click or copy links below to go to your try post immediately :</p>
            ${urls.join('\n')}
        `
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function mailScheduler(){
    questionModel
        .find({
            hasNewComment: true
        }).populate('owner')
        .then((questions) => {
            let filterEmail = {};
            questions.forEach(question => {
                if (!filterEmail[question.owner.email]) {
                    filterEmail[question.owner.email] = []
                }
                filterEmail[question.owner.email].push(`${process.env.WEB_URL}/try/${question._id}`)
            });
            
            for (const email in filterEmail) {
                const job = queue
                    .create("sendEmail", {
                        email, bodies: filterEmail[email]
                    })
                    .save(function(err){
                        if(!err) console.log('berhasil', job.id)
                    })
            }
            queue.process('sendEmail', function(job, done){
                sendEmail(job.data)
                done()
            })

            return questionModel
                .updateMany({
                    hasNewComment: true
                },{
                    hasNewComment: false
                })
        }).then((result) => {
            console.log('Notifier emails send successfully', {result});
        })
}

module.exports = mailScheduler
