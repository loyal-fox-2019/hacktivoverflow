const CronJob = require('cron').CronJob;
const Question = require('./models/Question')
const Answer = require('./models/Answer')
const User = require('./models/User')
const fs = require('fs');


let data = []
new CronJob('0 0 0 * * *', function() {
  let queries = 
  [Question.find({}).then((questions) => {
    data[0] = questions.length
  }),
  Answer.find({}).then((answers) => {
    data[1] = answers.length
  }),
  User.find({}).then((users) => {
    data[2] = users.length
  })]
  Promise.all(queries).then(() => {
    let today = new Date()
    let text = 
    `The server have ${data[0]} questions, ${data[1]} answers, ${data[2]} users on ${today}\n`
    fs.appendFile('serverLog.txt', text, (err) => {
      if (err) throw err;
      console.log('The log successfully updated!');
    });
  })
}, null, true, 'Asia/Jakarta');