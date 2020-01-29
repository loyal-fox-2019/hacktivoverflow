const router = require('express').Router(),
      usersRouter = require('./users'),
      answersRouter = require('./answers'),
      questionsRouter = require('./questions'),
      { authentication } = require('../middlewares/auth')

router.get('/', (req, res, next) => {
  res.send('Welcome to Hackoverflow!')
})

router.use('/users', usersRouter)
router.use(authentication)
router.use('/answers', answersRouter)
router.use('/questions', questionsRouter)

module.exports = router