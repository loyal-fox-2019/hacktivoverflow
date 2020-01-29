if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require('./routes');

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded
mongoose.connect(`mongodb://localhost:27017/errorhandler_${process.env.NODE_ENV}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/', routes)

app.listen(port, () => console.log(`ErrorHandler listening on port ${port}!`));