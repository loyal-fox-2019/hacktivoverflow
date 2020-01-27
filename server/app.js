'use strict';
if (process.env.NODE_ENV === 'development') require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const MONGO_URI = process.env.MONGO_URI;
const errHandler = require('./middlewares/errHandler')

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
.then(() => console.log(`Connected to database ${MONGO_URI}`))
.catch(() => console.log(`Connection to database fail`));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.use(errHandler);
module.exports = app;