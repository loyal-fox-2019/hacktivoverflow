const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');

router.get("/", answerController.findAll);
router.get("/:id", answerController.findOne);

module.exports = router;
