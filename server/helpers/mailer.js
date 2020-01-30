const question = require('../models/questions')
const kue = require('kue')
const queue = kue.createQueue()
const nodemailer = require('nodemailer');
require('dotenv').config()

module.exports = function () {
    question.find().populate('userId')
    .then(userDatas => {
        // console.log(userDatas)
        userDatas.forEach(element => {
            // console.log(element.email)
            const job = queue.create('email', {data: element} ).save( function(err){
                if( !err ) console.log( job.id );
             });
        })
         queue.process('email', function(job, done){
            //  console.log(job.data.data)
             const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'hacktiv8overflow123@gmail.com',
                  pass: process.env.NODEMAILER
                }
              });
              
              const mailOptions = {
                from: 'hacktiv8overflow123@gmail.com',
                to: job.data.data.userId.email,
                subject: 'Your Weekly Question Update',
                text: `This is your weekly question update.
                    Your question "${job.data.data.title}", have ${job.data.data.upVotes.length} upVotes and ${job.data.data.downVotes.length} downVotes`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
             done()
           });
    })
}


