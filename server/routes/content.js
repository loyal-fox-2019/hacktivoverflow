const express = require('express')
const router = express.Router()
const Content = require('../controllers/contentController')
const auth = require('../middlewares/auth')

/* GET users listing. */
router.get('/', Content.getAll)
router.post('/comment/:id', auth.authentication, Content.addComment)
router.get('/userContent', auth.authentication, Content.getUserContent)
router.get('/:id', Content.findbyId)
router.delete(
  '/:id',
  auth.authentication,
  auth.authorization,
  Content.deleteOne
)
router.post('/', auth.authentication, Content.addContent)
router.post('/like/:id', auth.authentication, Content.likeQuestion)
router.post('/likeAnswer/:commentId', auth.authentication, Content.likeAnswer)
router.post(
  '/dislikeAnswer/:commentId',
  auth.authentication,
  Content.dislikeAnswer
)
router.post('/dislike/:id', auth.authentication, Content.dislikeQuestion)

module.exports = router
