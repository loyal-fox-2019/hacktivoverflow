var CronJob = require('cron').CronJob;
var User = require('../models/User')
var nodemailer = require('../helpers/nodemailer')

function cron() {
    new CronJob('@weekly', function () {
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
}

module.exports = cron 