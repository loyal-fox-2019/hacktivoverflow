if(process.env.NODE_ENV=='development'){
    require('dotenv').config()
    require('./config/mongoose')
}

const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const cron = require('cron').CronJob
const content = require('./helpers/mailer')

const job = new cron('* * * */7 * *', function(){
    console.log('test')
    content()
})
job.start()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', require('./routes/index'))

app.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`)
})