const router = require('express').Router()
const UserController = require('../controllers/userController')
const questionRouter = require('./questionRouter')
const answerRouter = require('./answerRouter')
const {authentication} = require('../middlewares/auth')

router.get(
   '/secretEndpointGetUsers',
   function(req, res, next) {
      if(!req.headers.secret_token && req.headers.secret_token != 'secret_token') next({
         errorCode: 400,
         message: 'You are not authorized to perform this action'
      })
      else next()
}, UserController.readAll)

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use('/question', questionRouter)
router.use('/answer', answerRouter)

router.use(authentication)
router.get('/user', UserController.getOne)
router.patch('/user/add_watched_tag', UserController.addWatchedTag)
router.patch('/user/remove_watched_tag', UserController.removeWatchedTag)

module.exports = router