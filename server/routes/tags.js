const express = require('express');
const router = express.Router();
const TagController = require('../controllers/TagController')

router.get('/', TagController.getAll)
router.post('/', TagController.create)
router.get('/:id', TagController.get)

module.exports = router;
