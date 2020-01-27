const cron = require('cron').CronJob;
const email = require('./email');

const sendMail = (
    mailTo,
    subject,
    mailContent
) => {
    new cron('* * * * * *', function () {
        email(
            mailTo,
            subject,
            mailContent
        );
    }, null, 'Asia/Jakarta')
};

module.exports = {
    sendMail
};

