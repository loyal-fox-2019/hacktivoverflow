const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')
const authenticate = require('../middlewares/authenticate')

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.get('/tags', authenticate, UserController.getTags)
router.post('/tags', authenticate, UserController.modifyTags)

module.exports = router