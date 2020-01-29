const cron = require('node-cron')
const nodemailer = require('nodemailer')


// let testAccount = nodemailer.createTestAccount()

cron.schedule("* * 10 * * *", function(){
    console.log('TCL \n============\n running cron job' )

    let transporter = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user: process.env.GMAIL,
            pass: process.env.GMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: "zenchouu@gmail.com",
        to: 'bezita.dragonbos@gmail.com',
        subject: 'JALAN NIH CRON',
        text: 'lorem ipsum nblablablablabla ',
        html: '<b>A Message from Node Cron App</b>'
    }

    transporter.sendMail(mailOptions, function(error, info){
        console.log('TCL \n============\n ', info)
        if(error){
            console.log('TCL \n============\n ', error)
        }else{
            console.log('TCL \n============\n ', 'Email successfully sent')
        }
    })


})
