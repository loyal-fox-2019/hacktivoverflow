if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 3000
const routes = require('./routes')
const cors = require('cors')
const mailer = require('./helpers/mailer')
const cron = require('cron').CronJob

// const job = new cron('*/10 * * * * *', function(){
//     mailer()
// })
// job.start()
const job = new cron('0 0 0 * * SUN', function(){
    mailer()
})
job.start()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.listen(PORT, ()=>{
    console.log(`Listening on PORT ${PORT}`);
})

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(()=>{
    console.log('connected to database');
    
})
.catch(err=>{
    console.log(err);
})

app.use('/', routes)

module.exports = app