if (process.env.NODE_ENV === "development") require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const router = require("./router");
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost:27017/hacktivoferflow", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Sever Connected to MongoDB");
  })
  .catch(err => {
    console.log(err);
  });

app.use("/", router);
app.use(errorHandler);
app.listen(port, () =>
  console.log("HacktivOverflow Server Running on port : " + port)
);
