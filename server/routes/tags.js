const router = require('express').Router()
const TagController = require('../controllers/TagController')
const {authenticate} = require('../middlewares/auth')

router.use(authenticate)
router.get('/', TagController.getAll)
router.post('/', TagController.create)

module.exports = router