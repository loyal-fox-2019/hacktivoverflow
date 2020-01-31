require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes/index')
const { connectMongoose } = require('./config/mongoose')
const { errorHandler } = require('./middlewares/errorHandler')

connectMongoose(process.env.MONGO_URI)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/',routes)
app.use(errorHandler)

module.exports = app