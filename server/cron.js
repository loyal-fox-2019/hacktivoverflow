require('dotenv').config()
const cron = require("node-cron");
const express = require("express");
let nodemailer = require("nodemailer");
const User = require('./models/user')
const { connectMongoose } = require('./config/mongoose')

connectMongoose(process.env.MONGO_URI)
let email = []

app = express();

// specifying the mailOptions
let transporter = nodemailer.createTransport({
  // The service which will be used to send the emails
  service: "gmail",
  //   credentials to send emails
  auth: {
    user: "minioverflow51@gmail.com",
    pass: "M!niOverflow51"
  }
});

User.find({})
    .then(users=>{
        for(let user of users){
            email.push(user.email)
        }
        email.push('gb_chrs@yahoo.com')
        return email = email.join(',')
    })
    .then(emails => {
        cron.schedule("20 22 30 01 *", function() {
            console.log("-----------------");
            console.log("Running Cron Job");
            let mailOptions = {
                from: "minioverflow51@gmail.com",
                to: emails,
                subject: `Hi from Mini-Overflow Richard Khonan`,
                text: `Hi, please checkout the new questions!`
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                throw error;
                } else {
                console.log("email sent");
                }
            });
            });
    }) 
    .catch(err=>console.log(err))

  
  app.listen(3001);