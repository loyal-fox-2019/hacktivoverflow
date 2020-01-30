if(process.env.NODE_ENV === 'development'){
    require ('dotenv').config()
}

const express =require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
// const cronJob = require('./helpers/cron')
// cronJob()

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log('connect to database')
        })
        .catch(err =>{
            console.log(err)
        })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/',routes)

app.use(errorHandler)

module.exports = app