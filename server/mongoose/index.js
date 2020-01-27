const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, err => {
    if (err) {
        console.log(err);
        return
    }
    console.log('mongodb sucessfully connected')
});

module.exports = mongoose;