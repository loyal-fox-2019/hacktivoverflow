require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT || 3000
const router = require('./routers/index')
const CronJob = require('cron').CronJob
const mail = require('./mail')

const task = new CronJob('1 1 * * 1/7', function() {
    mail().then(console.log('success send email'));
})

task.start();


mongoose.connect(process.env.DATABASE, 
{useCreateIndex:true, useUnifiedTopology:true, useNewUrlParser: true}, function(){
    console.log('connect to Database')
})

app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(express.json())
app.use('/',router)


app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})