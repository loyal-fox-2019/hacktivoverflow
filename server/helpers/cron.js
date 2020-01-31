'use strict'

const CronJob = require('cron').CronJob
const Question = require('../models/question')

function cron() {
    new CronJob('00 * * * * *', function () {
        Question.find()
            .then(result => {
                let badQuestion = []
                result.forEach(element => {
                    // console.log(element.totalDownVotes)
                    if (element.totalDownVotes > 5) {
                        badQuestion.push(element.id)
                    }
                })
                console.log(badQuestion)
                for (let i = 0; i < badQuestion.length; i++) {
                    Question.deleteOne({ _id: badQuestion[i] })
                        .then(deleted => {
                            console.log(deleted)
                        })
                }
            })
            .catch(err => {
                next(err)
            })
    }, null, true, 'Asia/Jakarta')
}

module.exports = cron