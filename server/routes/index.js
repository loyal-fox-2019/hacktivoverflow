const router = require('express').Router(),
      usersRouter = require('./users'),
      answersRouter = require('./answers'),
      questionsRouter = require('./questions'),
      tagsRouter = require('./tags'),
      { authentication } = require('../middlewares/auth')

router.get('/', (req, res, next) => {
  res.send('Welcome to Hackoverflow!')
})

router.use('/users', usersRouter)
router.use(authentication)
router.use('/answers', answersRouter)
router.use('/questions', questionsRouter)
router.use('/tags', tagsRouter)

module.exports = router