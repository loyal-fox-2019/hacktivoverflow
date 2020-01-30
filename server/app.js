require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { answerRouter, userRouter, questionRouter } = require('./routes');
const errorHandling = require('./helpers/errorHandling');

const PORT = process.env.PORT || 3000;
const app = express();

const MONGO_URI =
  process.env.NODE_ENV === 'test'
    ? `mongodb://localhost:27017/hacktivOverflow-${process.env.NODE_ENV}`
    : process.env.DB_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`MONGODB connected successfully!`))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/answers', answerRouter);
app.use('/questions', questionRouter);
app.use('/users', userRouter);

app.use(errorHandling);

app.listen(PORT, () =>
  console.log(`Hacktiv Overflow listening at port ${PORT}`)
);

module.exports = app;
