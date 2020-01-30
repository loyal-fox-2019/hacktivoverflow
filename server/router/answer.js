const router = require("express").Router();
const Controller = require("../controllers/answer");
const authent = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization-answer");

router.get("/", Controller.getAllAnswer);
router.get("/:questionid", Controller.getAnswerByQuestion);
router.use(authent);
router.post("/", Controller.createAnswer);
router.put("/:id", authorization, Controller.editAnswer);

module.exports = router;
