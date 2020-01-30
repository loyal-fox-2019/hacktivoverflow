const nodemailer = require('nodemailer');
const kue = require("kue")
const queue = kue.createQueue()
const modeluser = require('./models/question-model')

async function find (){
    send ()
}

async function sendEmail(params) {
    let configMail, transporter, emailTarget, mail;
    configMail = {
        service: 'gmail',
      auth: {
          user: 'hacktiv8overflow123@gmail.com',
          pass: process.env.PASSWORDEMAIL
        }
    };
    
    transporter = await nodemailer.createTransport(configMail);
    emailTarget = params.owner.email
    
    mail = {
        to: emailTarget,
        from: configMail.auth.user,
        subject: 'Weekly report Question',
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
    modeluser.find().populate('owner')
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