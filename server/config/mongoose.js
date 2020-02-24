const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
})
  .then(_=> console.log('Connected to database...'))
  .catch(err => console.log('Failed to connect to database', err))

module.exports = mongoose