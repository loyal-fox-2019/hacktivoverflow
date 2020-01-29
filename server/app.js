'use strict'

require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const router = require('./routes')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())
app.use(morgan('dev'))

mongoose.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to the database!'))
  .catch(err => console.log(err))

app.use('/', router)
app.use(errorHandler)


module.exports = app