require ('dotenv').config()

const express =require('express')
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const routes = require('./routes')
const { errorHandler } = require('./middlewares/errorHandler')
const cors = require('cors')

mongoose.connect('mongodb://localhost:27017/gitOverflow',{useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log('Connected to mongoose!')
        })
        .catch((err) => {
            console.log(err)
        })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/',routes)
app.use(errorHandler)

app.listen(PORT, () => console.log(`app listening on port ${PORT}`))


