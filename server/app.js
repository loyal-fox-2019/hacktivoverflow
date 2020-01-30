"use strict"

require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000
const errorHandler = require('./middlewares/errorHandler')
const route = require('./router/index')
const cors = require('cors')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

mongoose.connect('mongodb://localhost/hacktivoverflow', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
    .then(() => {
        console.log('masuk')
    })


app.use('/', route)
app.use(errorHandler)


app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))