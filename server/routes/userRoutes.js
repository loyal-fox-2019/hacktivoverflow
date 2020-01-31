const express = require('express')
const router = express.Router()
const { userController } = require('../controllers')
const { authentication } = require('../middlewares/auth')

router.post('/register', userController.register)
router.post('/login', userController.login),
router.use(authentication)
router.get('/profile', userController.getProfile)
router.patch('/watchedTags', userController.addWatchedTags)
router.delete('/watchedTags', userController.removeWatchedTags)

module.exports = router