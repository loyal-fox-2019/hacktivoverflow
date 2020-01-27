const nodeMailer = require('nodemailer');

const emailSetAndSend = (
    mailTo,
    subject,
    mailContent
) => {
    console.log("Email confirmation is on the way to : " + mailTo);

    const transporter = nodeMailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_SERVER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_SERVER,
        to: mailTo,
        subject: subject,
        text: mailContent
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = emailSetAndSend;