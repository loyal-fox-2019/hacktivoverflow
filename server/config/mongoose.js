const mongoose = require("mongoose");
let URI = process.env.URI_DB

mongoose.connect(URI, 
  { 
    useNewUrlParser: true ,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() { 
  console.log("Connected!") 
});

module.exports = mongoose;