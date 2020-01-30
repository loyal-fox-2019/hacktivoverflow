const router = require("express").Router();
const Controller = require("../controllers/answer");
const authent = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization-answer");

router.get("/", Controller.getAllAnswer);
router.get("/:questionid", Controller.getAnswerByQuestion);
router.use(authent);
router.patch("/upvote/:id", Controller.upvote);
router.patch("/downvote/:id", Controller.downvote);
router.post("/", Controller.createAnswer);
router.put("/:id", authorization, Controller.editAnswer);
router.delete("/:questionId", Controller.deleteAnswer);
module.exports = router;
