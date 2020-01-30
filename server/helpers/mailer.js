'use strict';
const nodemailer = require('nodemailer');
function sendEmail() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'slimyhebat@gmail.com',
      pass: 'NabilaR6',
    },
  });
  const mailOptions = {
    from: 'slimyhebat@gmail.com',
    to: 'slimypiigyy@gmail.com',
    subject: 'New user at Hackoverflow',
    html: `Someone just register at hackoverflow!!`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err, 'error');
    }
  })
}
module.exports = sendEmail;
