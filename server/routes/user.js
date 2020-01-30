const router = require('express').Router()
const userController = require('../controllers/user')
const { authentication } = require('../middlewares/auth')
const gcs = require('../middlewares/gcs')

router.get('/', userController.getAllUser)

router.get('/one', authentication, userController.getOneUser)

router.post('/register', gcs.single('photo'), userController.register)

router.post('/login', userController.login)

router.patch('/', authentication, userController.addTags)

router.patch('/:tag', authentication, userController.removeTag)

module.exports = router