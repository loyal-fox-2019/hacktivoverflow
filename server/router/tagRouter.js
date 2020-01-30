const router = require('express').Router()
const TagController = require('../controller/TagController')
const authentication = require('../middleware/authentication')

router.get('/test', TagController.test)
router.get('/masterFind', TagController.masterFind)
router.delete('/masterDelete', TagController.masterDelete)


router.use(authentication)

router.post('/', TagController.createUpdateTag)
router.get('/:tagName', TagController.findOne)
router.patch('/:tagName', TagController.pullQuestionFromTag)


module.exports = router