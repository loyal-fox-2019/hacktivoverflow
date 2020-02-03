// if (process.env.NODE_ENV == 'development') {
//   require('dotenv').config()
// }
require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const routes = require('./routes')
const mail = require('./mail')
const CronJob = require('cron').CronJob

const task = new CronJob('1 0 * * 1/7', function() {
  mail().then(console.log('mail sent'))
}, 'Asia/Jakarta')

task.start()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('<===Database Connected===>')
  })
  .catch(err => {
    console.log('==Connection Error==', err)
  })

app.use('/', routes)

app.listen(PORT, function() {
  console.log('App listening on PORT', PORT)
})
