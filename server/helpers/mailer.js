const nodemailer = require("nodemailer");
function send (data, email) {  
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'gmail.com', // generated ethereal user
            pass: ')((*Y&%&^&$' // generated ethereal password
        }
    });
  
    // send mail with defined transport object
    transporter.sendMail({
      from: 'dzakkiaz01@gmail.com',
      to: email, // list of receivers
      subject: "Stuckoverlow ✔", // Subject line
      text: "You created new question?", // plain text body
      html: data // html body
    }, function (error, info) {
        console.log(error)
        console.log(info)
    });
}
module.exports = send