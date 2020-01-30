'use strict'

const cron = require('node-cron');
const nodeMailer = require('nodemailer');
const User = require('./models/user')

function sendEmails () {

  let emails = []

  let transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "alvina.tjia@gmail.com",
      pass: process.env.EMAIL_PASSWORD
    }
  });

  User.find({})
  .then(users => {
    users.forEach(el => {
      emails.push(el.email)
      cron.schedule('0 0 1 * *', function () {
        console.log("-----------------");
        console.log("Running Cron Job");
        let mailOptions = {
          from: "alvina.tjia@gmail.com",
          to: emails,
          subject: "Hello there!",
          text: "This email was automatically sent by Hackoverflow team"
        }
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email successfully sent!')
          }
        })
      });
    })
  })
  .catch(err => {
    console.log(err)
  })
  
}

module.exports = sendEmails;