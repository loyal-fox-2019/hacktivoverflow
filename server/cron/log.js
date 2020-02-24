let CronJob = require('cron').CronJob
const fs = require('fs')
const moment = require('moment')
const Question = require('../models/Question')

const job = new CronJob('0 0 * * *', async function(req, res, next) {
  let dateLogged = moment(Date.now()).format('DD/MM/YYYY')
  try {
    let question = await Question.find({})
    fs.appendFileSync('log.txt', `${dateLogged}: ${question.length} Questions logged \n`);
    console.log('The "data to append" was appended to file!');
  } catch (err) {
    next(err)
  }
}, null, true, 'Asia/Jakarta');
job.start();