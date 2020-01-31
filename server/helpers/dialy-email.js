'use strict'
const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
async function main(mailList) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.NM_EMAIL, // generated ethereal user
      pass: process.env.NM_PASSWORD, // generated ethereal password
    },
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.NM_EMAIL, // sender address
    to: mailList.join(', '), // list of receivers
    subject: 'Hello from Stuck-Overflow', // Subject line
    text:
      'Have you ask a question today on http://stuck-overflow.didadadida93.xyz?', // plain text body
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = main
