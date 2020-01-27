if(process.env.NODE_ENV=='development'){
    require('dotenv').config()
    require('./config/mongoose')
}

const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', require('./routes/index'))



app.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`)
})