if(process.env.NODE_ENV == 'development') require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT2 || 3000
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const router = require('./routers')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect(`mongodb://localhost:27017/hackoverflow04`, {
   useCreateIndex: true,
   useNewUrlParser: true,
   useUnifiedTopology: true
})

app.use(router)
app.use(errorHandler)

app.listen(port, () => console.log(`listening on port ${port}`))