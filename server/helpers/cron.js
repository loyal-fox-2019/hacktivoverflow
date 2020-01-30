const CronJob = require('cron').CronJob,
  Question = require('../models/question')

function cron(){
new CronJob('00 * * * * *', function() { // every 5 minute
  Question.find()
    .then(result => {
      let badQuestion = []
      result.forEach(element => {
        if(element.downvotes.length >= 3) {
          badQuestion.push(element.id)
        }
      });
      for (let i = 0; i < badQuestion.length; i++) {
        Question.deleteOne({_id: badQuestion[i]})
          .then(deleted => {
            console.log(deleted)
            console.log("INI ADA YANG JELEK CROOOONNN=================", badQuestion[i])
          })
      }
    })
    .catch(err => {
      console.log("INI ERRORR CROOOONNN=================" ,err)
      next(err)
    })
}, null, true, 'Asia/Jakarta');
}

module.exports = cron