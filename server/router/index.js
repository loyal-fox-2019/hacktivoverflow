const router = require('express').Router()


router.use('/users', require('./userRouter'))
router.use('/questions', require('./questionRouter'))
router.use('/answers', require('./answerRouter'))
router.use('/tags', require('./tagRouter'))

module.exports = router