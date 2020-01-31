const router = require("express").Router();
const Controller = require("../controllers/question");
const authent = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization-question");

router.get("/", Controller.getAllQuestion);
router.get("/:id", Controller.getQuestionById);
router.use(authent);
router.patch("/upvote/:id", Controller.upvote);
router.patch("/downvote/:id", Controller.downvote);
router.post("/", Controller.createQuestion);
router.delete("/:id", authorization, Controller.deleteQuestion);
router.put("/:id", authorization, Controller.editQuestion);
module.exports = router;
