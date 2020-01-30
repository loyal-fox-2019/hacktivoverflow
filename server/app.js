const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')
const CronJob = require('cron').CronJob;
const mailer = require('./helpers/mailer')

mongoose.connect('mongodb://localhost:27017/hacktiv-overflow', {useNewUrlParser:true, useUnifiedTopology:true})
.then(success => {
    console.log('connected to hacktiv-overflow on mongoDB')
})
.catch(err => {
    console.log(err)
})

const job = new CronJob('0 8 * * 1/7', function() {
    mailer()
}, null, true, 'America/Los_Angeles');

job.start()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)

app.listen(port, () => {
    console.log('server running on port ' + port)
})