const mongoose = require('mongoose')
const mongodb_uri =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/hacktivoverflow'

mongoose
  .connect(mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('connected to db'))
  .catch(() => console.log('failed to connect to db'))
