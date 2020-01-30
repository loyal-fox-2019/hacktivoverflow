const User = require('../models/user')
const { CronJob } = require('cron')
const dialyMailer = require('./dialy-email')

const job = new CronJob(
  '0 12 * * */1',
  function() {
    User.find()
      .then(users => {
        let emails = users.map(user => user.email)

        return dialyMailer(emails)
      })
      .then(() => console.log('done'))
      .catch(err => {
        console.log(err)
      })
  },
  null,
  true,
  'Asia/Jakarta',
)

module.exports = job
