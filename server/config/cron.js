const cron = require('node-cron')
const nodemailer = require('nodemailer')

console.log(' \n======================\n JALAN INIH')
let testAccount = nodemailer.createTestAccount()
require('dotenv').config()

cron.schedule("0 0 20 * */1 *", function(){
    console.log('TCL \n============\n running cron job' )
    
    let transporter = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user: process.env.GMAIL,
            pass: process.env.GMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: "blablabla@blabla.com",
        to: 'zenchouu@gmail.com',
        subject: 'JALAN NIH CRON',
        text: 'lorem ipsum nblablablablabla ',
        html: '<b>A Message from Node Cron App, minggu depan bulan neraka dimulai. phase 3</b>'
    }

    transporter.sendMail(mailOptions, function(error, info){
        console.log(`TCL: info`, info)
        if(error){
            console.log(`TCL: error`, error)
        }else{
            console.log('TCL \n============\n ', 'Email successfully sent')
        }
    })


})
