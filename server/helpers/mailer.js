const question = require("../models/question");
const kue = require("kue");
const queue = kue.createQueue();
const nodemailer = require("nodemailer");

module.exports = function() {
  question
    .find()
    .populate("userId")
    .then(users => {
      users.forEach(elemnt => {
        const job = queue.create("email", { data: elemnt }).save(function(err) {
          if (!err) console.log(job.id);
        });
      });
    });
  queue.process("email", function(job, done) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hacktivoferflow.info@gmail.com",
        pass: process.env.EMAILPASS
      }
    });

    let upvote = 0;
    let downvote = 0;
    if (job.data.data.upvote) {
      upvote = job.data.data.upvote.length;
    }
    if (job.data.data.downvote) {
      downvote = job.data.data.downvote.length;
    }

    const mailOptions = {
      from: "hacktivoverflow.info@gmail.com",
      to: job.data.data.userId.email,
      subject: "Your Weekly Question Update",
      text: `This is your weekly question update.
        Your question "${job.data.data.title}", have ${upvote} upVotes and ${downvote} downVotes`
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent :" + info.response);
      }
    });
    done();
  });
};
