const routes = require("express").Router()
const controlAnswer = require("../controllers/controlAnswer.js")
const authentication = require("../middlewares/authentication.js")
const { toEditAnswer } = require("../middlewares/authorization.js")

routes.post("/:questionId", authentication, controlAnswer.createAnswer)
routes.put("/:answerId", authentication, toEditAnswer, controlAnswer.editAnswer)
routes.patch("/upvote/:id", authentication, controlAnswer.upvoteAnswer)
routes.patch("/downvote/:id", authentication, controlAnswer.downvoteAnswer)

module.exports = routes