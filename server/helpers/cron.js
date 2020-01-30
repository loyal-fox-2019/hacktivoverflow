var CronJob = require('cron').CronJob
var User = require('../models/user')
var mailer = require('../helpers/mailer')

function cron() {
  new CronJob(
    '8 * * * * *',
    function() {
      User.find().then(data => {
        let dataEmail = []
        data.forEach(element => {
          dataEmail.push(element.email)
        })
        console.log(dataEmail.join(','))
        return mailer(dataEmail.join(',')).then(respone => {
          console.log('yeay')
        })
      })
    },
    null,
    true,
    'Asia/Jakarta'
  )
}

module.exports = cron
