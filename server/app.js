if (process.env.NODE_ENV == 'development') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.LOCAL_MONGO, {
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

app.listen(PORT, function() {
    console.log('App listening on PORT', PORT)
})