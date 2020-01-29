const router = require('express').Router(),
  UserController = require('../controllers/user'),
  { authenticate, userAuthorize } = require('../middlewares/auth')

router.get('/', UserController.all)
router.use(authenticate)
router.patch('/addTags', UserController.addTags)
router.patch('/removeTag', UserController.removeTag)

module.exports = router
