const cron = require('node-cron')
const app = require('express')()
const nodemailer = require('nodemailer')
const mongoose = require('mongoose')
mongoose.connect(`mongodb://localhost:27017/hackoverflow04`, {
   useCreateIndex: true,
   useNewUrlParser: true,
   useUnifiedTopology: true
})

const Question = require('./models/Question')

Question.find()
.then(questions => {
   const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: 'zoe.development27@gmail.com',
         pass: 'hacktiv8development'
      }
   })

   // console.log('sending first email before starting cronjobs')
   // let mailOptions = {
   //    from: 'zoe.development27@gmail.com',
   //    to: 'zoe.zachary.27@gmail.com',
   //    subject: 'Your website is growing!',
   //    text: `Hi Zoe, your website is now having ${questions.length} questions!`
   // }

   // transporter.sendMail(mailOptions, (err, results) => {
   //    if(err) throw err
   //    else {
   //       console.log('Email sent!', results)
   //    }
   // })

   cron.schedule("0 0 * * 1", function() {
      const mailOptions = {
         from: 'zoe.development27@gmail.com',
         to: 'zoe.zachary.27@gmail.com',
         subject: 'Your website is growing!',
         text: `Hi Zoe, your website is now having ${questions.length} questions!`
      }

      transporter.sendMail(mailOptions, (err, results) => {
         if(err) throw err
         else {
            console.log('Email sent!', results)
         }
      })
   })
})
.catch(error => console.log(error))

app.listen(3120, () => console.log(`Cronjob is running on port 3120`))