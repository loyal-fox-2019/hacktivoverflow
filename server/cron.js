require('dotenv')
const cron = require('node-cron')
const nodemailer = require('nodemailer')
const { User } = require('./models')

module.exports = () => {
  console.log(process.env.EMAIL)
  let emails = []
  User.find()
    .then(users => {
      users.forEach(user => {
        emails.push(user.email)
      })

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD_CRON
        }
      })
      cron.schedule("31 18 * * *", function() {
        let mailOptions = {
          from: "ngulikpustaka@gmail.com",
          to: emails,
          subject: 'Hello from HackOverflow!',
          text: 'A kindly reminder for you to checkout yuckOverflow :)'
        };
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            throw error
          } else {
            console.log("Email sent!")
          }
        })
      })
    })
    .catch(err => {
      console.log(err)
    })
} 