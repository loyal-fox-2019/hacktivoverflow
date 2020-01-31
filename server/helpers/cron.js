var CronJob = require('cron').CronJob;
var User = require('../models/User')
var nodemailer = require('../helpers/nodemailer')

new CronJob('0 0 0 * * 7', function () {
    User.find()
        .then(usr => {
            let dataEmail = []
            usr.forEach(element => {
                dataEmail.push(element.email)
            });
            return nodemailer(dataEmail.join(','))
                .then(respone => {
                    console.log('masuk')
                })
        })
}, null, true, 'Asia/Jakarta'); 