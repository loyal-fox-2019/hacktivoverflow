const routes = require("express").Router()
const controlQuestion = require("../controllers/controlQuestion.js")
const authentication = require("../middlewares/authentication.js")
const { toEditAndDeleteQuestion } = require('../middlewares/authorization')

routes.post("/ask", authentication, controlQuestion.askQuestion)
routes.put("/edit/:id", authentication, toEditAndDeleteQuestion, controlQuestion.editQuestion)
routes.get("/allQuestion", controlQuestion.allQuestion)
routes.delete("/delete/:id", authentication, toEditAndDeleteQuestion, controlQuestion.deleteQuestion)
routes.get("/answers/:id", controlQuestion.getAllAnswerOfThisQuestion)
routes.patch("/upvote/:id", authentication, controlQuestion.upvoteQuestion)
routes.patch("/downvote/:id", authentication, controlQuestion.downvoteQuestion)
routes.get("/oneQuestion/:id", controlQuestion.getQuestionById)
routes.get("/searchByTitle/:title", controlQuestion.findByTitle)
routes.get("/searchByTag/:tag", controlQuestion.searchByTag)


module.exports = routes