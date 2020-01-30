const nodemailer = require('nodemailer');
const kue = require("kue")
const queue = kue.createQueue()
const Answer = require('./models/answer')

async function find (){
    send ()
}

async function sendEmail(params) {
    let configMail, transporter, emailTarget, mail;
    configMail = {
        service: 'gmail',
      auth: {
          user: 'hacktiv.overflow123@gmail.com',
          pass: process.env.PASSWORDEMAIL
        }
    };
    
    transporter = await nodemailer.createTransport(configMail);
    emailTarget = params.userId.email
    
    mail = {
        to: emailTarget,
        from: configMail.auth.user,
        subject: 'Weekly report Answer',
        html: `This is your weekly report. your question ${params.title} 
         have ${params.upvotes.length} upvotes and ${params.downvotes.length} downvotes`
    };
    transporter.sendMail(mail, function(err, info){
        if(err){
            console.log(err)
        } else {
            console.log(info.response)
        }
    });
}
function send (){
    Answer.find().populate('userId')
    .then((data)=>{
        data.forEach(element => {
            const job = queue
            .create("email", {
              title: element
            })
            .save(function(err) {
              if (!err) console.log(job.id);
            });
            queue.process('email', (job, done) => {  
                sendEmail(job.data.title)
                done();
              });    
        });
    })
}


module.exports = find