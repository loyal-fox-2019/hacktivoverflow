const cron = require('cron').CronJob;
const user = require('../models/user');
const email = require('./email');

const runCron = () => {
    new cron('48 22 * * *', function () {
        user.find({
            status: 'active'
        }).then(response => {
            email(
                'michael.wenceslaus@gmail.com',
                "User active",
                "User active : " + response.length
            )
        }).catch(err => {
            console.log(err)
        })
    }, null, 'Asia/Jakarta').start()
};

module.exports = {
    runCron
};

