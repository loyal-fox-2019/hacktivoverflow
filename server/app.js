if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
  require('dotenv').config()
}

require('./config/mongoose')
require('./cron/log')
const express = require('express'),
  app = express(),
  routes = require('./routes'),
  errorHandler = require('./middlewares/errorHandler'),
  cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', routes)
app.use(errorHandler)

module.exports = app
