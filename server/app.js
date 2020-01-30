if (process.env.NODE_ENV == "test" || process.env.NODE_ENV == "development" || !process.env.NODE_ENV) {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT || 3000
const routes = require('./router')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

let mongoURL = process.env.MONGOURL
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        console.log(`connected to database ${mongoURL}`)
    })
app.use('/', routes)

app.listen(port, () => {
    console.log(`connected to port ${port}`)
})

module.exports = app