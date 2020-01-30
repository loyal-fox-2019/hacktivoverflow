if (process.env.NODE_ENV == 'development'){
  require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routes')
const cors = require('cors')
require('./cron.js')

const mongoose = require('mongoose')
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

mongoose.connect(process.env.MONGO_URI, options).then(
  () => { console.log('Connected to MongoDB') },
  err => { console.log(err) }
);

app.use(routes)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})