const router = require('express').Router()
const UserController =  require('../controller/UserController')
const authentication = require('../middleware/authentication')

router.get('/test', UserController.test)
router.get('/masterFind', UserController.findAllUser)
router.delete('/masterDelete', UserController.masterDelete)

router.get('/', UserController.findAllUser)


router.post('/register', UserController.register)
router.post('/login', UserController.logIn)

router.use(authentication)
router.patch('/updateTag', UserController.updateTag)


module.exports = router