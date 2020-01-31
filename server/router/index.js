const router = require("express").Router();
const User = require("./user");
const Question = require("./question");
const Answer = require("./answer");

router.use("/users", User);
router.use("/questions", Question);
router.use("/answers", Answer);
module.exports = router;
