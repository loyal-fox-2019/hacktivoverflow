const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication');
const voteController = require('../controllers/vote');

router.use('/', authentication)
router.post('/', voteController.processVote);

module.exports = router