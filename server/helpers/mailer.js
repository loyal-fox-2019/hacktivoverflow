const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
async function main(toEmail) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'bisasemua02@gmail.com',
      pass: 'yayaya123'
    }
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'bisasemua02@gmail.com', // sender address
    to: toEmail, // list of receivers
    subject: 'Hello User', // Subject line
    text: 'welcome', // plain text body
    html: '<b>jangan lupa check hackoverflow kamu</b>' // html body
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = main
