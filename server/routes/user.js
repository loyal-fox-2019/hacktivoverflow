const router = require('express').Router(),
  UserController = require('../controllers/user'),
  { authenticate, userAuthorize } = require('../middlewares/auth')

router.get('/', UserController.all)
router.use(authenticate)
router.patch('/:id/addTag', userAuthorize, UserController.addTag)

module.exports = router
