"use strict"
const nodemailer = require('nodemailer');

function mailSend(email) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    let mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Stuck Operflow',
        text: `jangan lupa untuk datang ke web stuck operflow, pertanyaanmu tidak adakan terjawab di web ini`
    }

    transporter.sendMail(mailOptions, (error, info) => {
    })
}
module.exports = mailSend