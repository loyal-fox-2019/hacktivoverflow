const mongoose = require('mongoose')
let MongoURI;

if (process.env.NODE_ENV === 'development') {
    MongoURI = process.env.MongoURI_DEV
} else {
    MongoURI = process.env.MongoURI
}

mongoose.connect(MongoURI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(_ => console.log('connected to database'))
    .catch(_ => console.log('cant connect to database'));

module.exports = mongoose