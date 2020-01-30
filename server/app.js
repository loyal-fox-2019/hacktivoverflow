if (process.env.NODE_ENV === 'development') require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const cronJob = require('./helpers/cron')
cronJob.start()

require('./config/mongodb')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', require('./routes'))
app.use(require('./middlewares/error-handler'))

module.exports = app
