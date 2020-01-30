require('dotenv').config()
const express = require('express'),
  cors = require('cors'),
  routes = require('./routes'),
  errorHandler = require('./middlewares/errorHandler'),
  app = express(),
  cronJob = require('./helpers/cron')
  
cronJob()
require('./config/mongoose')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', routes)
app.use(errorHandler)

module.exports = app
