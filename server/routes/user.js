const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const googleAuth = require('../middlewares/googleAuth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/glogin/:id_token', googleAuth, UserController.glogin)

module.exports = router