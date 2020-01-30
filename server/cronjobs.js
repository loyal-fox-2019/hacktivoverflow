const cron = require('node-cron')
const app = require('express')()
const fs = require('fs')
const nodemailer = require('nodemailer')

const Question = require('./models/Question')

Question.find()
.then(questions => {
   const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         zoe: 'zoe.development27@gmail.com',
         password: 'Development23'
      }
   })

   cron.schedule("0 0 * * 1", function() {
      const mailOptions = {
         from: 'zoe.development27@gmail.com',
         to: 'zoe.zachary.27@gmail.com',
         subject: 'Your website is growing!',
         text: `Hi Zoe, your website is now having ${questions.length} questions!`
      }

      transporter.sendMail(mailOptions, (err, results) => {
         if(err) throw err
      })
   })
})
.catch(error => console.log(error))

app.listen(3120)