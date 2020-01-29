const router = require('express').Router()
const userController = require('../controllers/user')
const { authentication } = require('../middlewares/auth')

router.get('/', userController.getAllUser)

router.post('/register', userController.register)

router.post('/login', userController.login)

router.patch('/', authentication, userController.addTags)

router.patch('/:tag', authentication, userController.removeTag)

module.exports = router