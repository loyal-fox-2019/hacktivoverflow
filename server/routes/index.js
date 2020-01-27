const router = require('express').Router()
const UserController = require('../controllers/user-controller')
const thirdAPIRouter = require('./third-api-router')

router.get('/', function(req, res, next) {
  res.json({ message: 'Server alive!' })
})
router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.use('/third-api-login', thirdAPIRouter)

module.exports = router
