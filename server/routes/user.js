const express = require('express')
const router = express.Router()
const userController = require('../controllers/user');

router.post('/register', userController.register)
router.get('/register/:id', userController.getConfirmData)
router.post('/register/:id/confirm', userController.confirm)
router.post('/login', userController.login)
router.post('/oauth', userController.oauth)

module.exports = router