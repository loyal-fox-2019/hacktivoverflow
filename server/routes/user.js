const router = require('express').Router()
const userController = require('../controllers/userController')
const { authentication } = require('../middlewares/auth')

router.post('/register',userController.register)
router.post('/login', userController.login)
router.use(authentication)
router.put('/tag',userController.addTag)
router.get('/tag',userController.getTag)
router.delete('/tag',userController.deleteTag)

module.exports = router