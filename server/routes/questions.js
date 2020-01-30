const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.get("/", questionController.findAll);
router.get("/:id", questionController.findOne);

module.exports = router;
