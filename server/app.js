require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const cors = require('cors')
const CronJob = require('cron').CronJob
const mailer = require('./mailer')

const task = new CronJob('0 0 0 * * *', function() {
  mailer().then(console.log(`Email send`))
})

task.start()

mongoose
  .connect(process.env.MONGO_URL, {
    // .connect('mongodb://localhost:27017/hacktiv-overflow', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then((result) => {
    console.log('connected')
  })
  .catch((err) => {
    console.log(err)
  })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const mainRouter = require('./routes')

app.use('/', mainRouter)

const errorHandler = require('./middlewares/errorHandler')

app.use(errorHandler)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
