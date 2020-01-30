const mongoose = require('mongoose')

function connectMongoose (uri) {
    mongoose.connect(`mongodb://localhost/${uri}`,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
        .then( () => {
            console.log('Connected to db',uri)
        })
        .catch( err => {
            console.log(err)
        })
}

module.exports = {
    connectMongoose
}