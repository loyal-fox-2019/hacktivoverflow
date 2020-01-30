const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(()=>{
    console.log('connected to database')
})
.catch(()=>{
    console.log('cannot connect to database')
})