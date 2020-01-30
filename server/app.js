'use strict';

if(process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const routesIndex = require('./routes');
const cronJob = require('cron').CronJob
const mail = require('./mail');

const task = new cronJob('1 1 * * * 1/7', function() {
    mail().then(console.log(`Success sending mail`))
})

task.start();

mongoose.connect(process.env.MONGO_ATLAS, {useNewUrlParser: true, useUnifiedTopology: true}, function() {
    console.log(`Connected to MongoDB`);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routesIndex);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
})