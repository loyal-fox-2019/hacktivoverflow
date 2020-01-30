if (process.env.NODE_ENV === "development") {
  console.log(`"${process.env.NODE_ENV}"`);
  require('dotenv').config();
}

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log(`MongoDB connected to ${process.env.MONGODB_URI}`);
  })
  .catch((err) => {
    console.error(err);
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use(errorHandler);

module.exports = app;
