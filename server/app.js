if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stuckoverlow', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
const express = require('express');
const indexRouter = require('./routes/index');
const cors = require('cors');
const app = express();
const kue = require('./helpers/excuteKue')
kue()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var CronJob = require('cron').CronJob;
var job = new CronJob('*/1 * * * * *', function() {
  console.log()
  require('./helpers/clearQuestion')()
}, null, true, "Asia/Jakarta");
job.start();

app.use('/', indexRouter);
// catch 404 and forward to error handler
app.use(function(err, req, res, next) {
  console.log(err)
  if(err.name === "AuthError"){
    res.status(400).json({
      errors: [err.message]
    })
  }else if (err.name === "ValidationError") {
    const result =  err.errors
    const errors = []
    for (const key in result) {
      if (result.hasOwnProperty(key)) {
        errors.push(result[key].message)
      }
    }
    res.status(409).json({
      errors: errors
    })
  }else if (err.name === 'MongoError') {
    const errors = []
    for (const key in err.keyValue) {
      if (err.keyValue.hasOwnProperty(key)) {
        errors.push(`${key} has been used`)
      }
    }
    res.status(409).json({
      errors: errors
    })
  }else{
    console.log("Ada errors", err)
    res.status(500).json({
      errors: ['internal server error']
    })
  }
});

app.listen(3000, () => console.log('listening app by port: 3000'))
