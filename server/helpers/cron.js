  
const CronJob = require('cron').CronJob;
const Question = require('../models/question')
const Answer = require('../models/answer')
const fs = require('fs');


let data = []
new CronJob('0 0 0 1 * *', function() {
  let promises = [Question.deleteMany({downVotes: {$size: 25}}), Answer.deleteMany({downVotes: {$size: 25}})]
  Promise.all(promises)
  .then((data) => {
    let date = new Date().toLocaleDateString()
    let text = 
    `The server delete ${data[0].deletedCount} questions, ${data[1].deletedCount} answers, on ${date}\n`
    fs.appendFile('deleteLog.txt', text, (err) => {
      if (err) throw err;
      console.log('The log successfully updated!');
    });
  }).catch((err) => {
      console.log(err)
      let date = new Date().toLocaleDateString()
      let text = 'error at ' + date
      fs.appendFile('deleteLog.txt', text, (err) => {
        if (err) throw err;
        console.log('The log successfully updated!');
      });

  });
}, null, true, 'Asia/Jakarta');