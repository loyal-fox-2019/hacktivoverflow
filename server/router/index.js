const routes = require('express').Router()
const userRoute = require("./userRoute.js")
const questionRoute = require("./questionRoute.js")
const answerRoute = require("./answerRoute.js")

routes.use("/user", userRoute)
routes.use("/question", questionRoute)
routes.use("/answer", answerRoute)

module.exports = routes