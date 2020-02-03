const mailer = require('nodemailer')
const kue = require('kue')
const queue = kue.createQueue()
const Question = require('./models/question')

async function find() {
  send()
}

async function sendMail(params) {
  let transporter
  let mailTarget
  let mail

  const config = {
    service: 'gmail',
    auth: {
      user: 'hacktiv8overflow123@gmail.com',
      pass: process.env.MAIL_PASS
    }
  }

  transporter = await mailer.createTransport(config)
  console.log(params.user_id.email)
  mailTarget = params.user_id.email

  mail = {
    to: mailTarget,
    from: config.auth.user,
    subject: 'Weekly Question Report',
    html: `Here's your question recap. Your Question: ${params.title}, 
            you've got ${params.views} views, 
            with ${params.upvote.length} upvote and ${params.downvote.length} downvote. Thank you!`
  }
  transporter.sendMail(mail, function(err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info.response)
    }
  })
}

function send() {
  Question.find()
    .populate('user_id')
    .then(data => {
      data.forEach(el => {
        const createJob = queue
          .create('email', {
            title: el
          })
          .save(err => {
            if (!err) {
              console.log(createJob.id)
            }
          })
        queue.process('email', (job, done) => {
          sendMail(job.data.title)
          done()
        })
      })
    })
}

module.exports = find
