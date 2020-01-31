'use strict'

require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const port = process.env.PORT || 3000
const mongoDB = process.env.MONGO_URI || `mongodb://localhost:27017/hackoverflow-dev`

const errorHandler = require('./middlewares/errorHandler')
const router = require('./routes')
const cronjob = require('./helpers/cron')

cronjob()

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(router)
app.use(errorHandler)

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log(`connected to mongoDB : ${mongoDB}`))
    .catch(() => console.log(`Failed connect to MongoDB : ${mongoDB}, ${err}`))

app.listen(port, () => {
    console.log(`server ready, listening on port ${port}`)
})