require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const mailSender = require('./cron')
require('./config/mongoose')

mailSender()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello, there!')
})

app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`)
})