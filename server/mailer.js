const nodemailer = require('nodemailer')
const kue = require('kue')
const queue = kue.createQueue()
const modelUser = require('./models/question')

async function find() {
  send()
}

async function sendEmail(params) {
  let configMail, transporter, emailTarget, mail
  configMail = {
    service: 'gmail',
    auth: {
      user: 'nodemailer.bot.h8overflow@gmail.com',
      pass: process.env.NODEMAILER_EMAIL_PASS
    }
  }

  transporter = await nodemailer.createTransport(configMail)
  emailTarget = params.author.email

  mail = {
    to: emailTarget,
    from: configMail.auth.user,
    subject: 'Daily report Question',
    html: `Your daily question report, with question ${params.title}
        have ${params.upvotes.length - params.downvotes.length} votes and ${
      params.answers.length
    } answers`
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
  modelUser
    .find()
    .populate('author')
    .then((data) => {
      data.forEach((element) => {
        const job = queue
          .create('email', {
            title: element
          })
          .save(function(err) {
            if (err) {
              console.log(job.id)
            }
          })
        queue.process('email', (job, done) => {
          sendEmail(job.data.title)
          done()
        })
      })
    })
    .catch((err) => {})
}

module.exports = find
