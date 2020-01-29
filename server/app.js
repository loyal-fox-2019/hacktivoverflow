require('dotenv').config()
require('./helpers/mongoose')

const express = require('express'),
    app = express(),
    cors = require('cors'),
    router = require('./routes'),
    port = process.env.PORT || 3000,
    errorHandler = require('./middlewares/errorHandler'),
    morgan = require('morgan')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'))

app.use('/', router)

app.use((req, res, next) => {
    const err = {
        msg: 'Not Found.',
        status: 404
    }
    next(err);
})

app.use(errorHandler)

app.listen(port, () => console.log(`listengin to port ${port}`))