const router = require('express').Router(),
  userRoutes = require('./user'),
  questionRoutes = require('./question'),
  answerRoutes = require('./answer'),
  UserController = require('../controllers/user'),
  upload = require('../middlewares/gcsUpload')

router.post('/register', upload.single('profile_pic'), UserController.register)
router.post('/login', UserController.login)
router.use('/users', userRoutes)
router.use('/questions', questionRoutes)
router.use('/answers', answerRoutes)

module.exports = router
