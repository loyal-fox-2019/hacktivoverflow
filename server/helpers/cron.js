const CronJob = require('cron').CronJob,
  Question = require('../models/question')

function cron(){
new CronJob('00 */5 * * * *', function() { // every 5 minute
  Question.deleteMany({downvotes: { $gt: 5 }})
    .then(result => {
      console.log(result)
    })
}, null, true, 'Asia/Jakarta');
}

module.exports = cron